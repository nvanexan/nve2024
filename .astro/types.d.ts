declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"about": {
"content.mdoc": {
	id: "content.mdoc";
  slug: "content";
  body: string;
  collection: "about";
  data: InferEntrySchema<"about">
} & { render(): Render[".mdoc"] };
};
"changelogs": {
"2021-11.mdoc": {
	id: "2021-11.mdoc";
  slug: "2021-11";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2021-12.mdoc": {
	id: "2021-12.mdoc";
  slug: "2021-12";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2022-01.mdoc": {
	id: "2022-01.mdoc";
  slug: "2022-01";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2022-02.mdoc": {
	id: "2022-02.mdoc";
  slug: "2022-02";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2022-03.mdoc": {
	id: "2022-03.mdoc";
  slug: "2022-03";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2022-04.mdoc": {
	id: "2022-04.mdoc";
  slug: "2022-04";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2022-05.mdoc": {
	id: "2022-05.mdoc";
  slug: "2022-05";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2022-06.mdoc": {
	id: "2022-06.mdoc";
  slug: "2022-06";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2022-11.mdoc": {
	id: "2022-11.mdoc";
  slug: "2022-11";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2022-12.mdoc": {
	id: "2022-12.mdoc";
  slug: "2022-12";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-01.mdoc": {
	id: "2023-01.mdoc";
  slug: "2023-01";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-02.mdoc": {
	id: "2023-02.mdoc";
  slug: "2023-02";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-03.mdoc": {
	id: "2023-03.mdoc";
  slug: "2023-03";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-04.mdoc": {
	id: "2023-04.mdoc";
  slug: "2023-04";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-05.mdoc": {
	id: "2023-05.mdoc";
  slug: "2023-05";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-06.mdoc": {
	id: "2023-06.mdoc";
  slug: "2023-06";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-07.mdoc": {
	id: "2023-07.mdoc";
  slug: "2023-07";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-08.mdoc": {
	id: "2023-08.mdoc";
  slug: "2023-08";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-09.mdoc": {
	id: "2023-09.mdoc";
  slug: "2023-09";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-10.mdoc": {
	id: "2023-10.mdoc";
  slug: "2023-10";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2023-11.mdoc": {
	id: "2023-11.mdoc";
  slug: "2023-11";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
};
"now": {
"content.mdoc": {
	id: "content.mdoc";
  slug: "content";
  body: string;
  collection: "now";
  data: any
} & { render(): Render[".mdoc"] };
};
"posts": {
"astro-keystatic-markdoc.mdoc": {
	id: "astro-keystatic-markdoc.mdoc";
  slug: "astro-keystatic-markdoc";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"markdoc.mdoc": {
	id: "markdoc.mdoc";
  slug: "markdoc";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"micro-frontends.mdoc": {
	id: "micro-frontends.mdoc";
  slug: "micro-frontends";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
"web-components.mdoc": {
	id: "web-components.mdoc";
  slug: "web-components";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdoc"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}
