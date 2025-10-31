declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
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
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
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
		collection: C,
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
"2023-12.mdoc": {
	id: "2023-12.mdoc";
  slug: "2023-12";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2024-01.mdoc": {
	id: "2024-01.mdoc";
  slug: "2024-01";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2024-02.mdoc": {
	id: "2024-02.mdoc";
  slug: "2024-02";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2024-03.mdoc": {
	id: "2024-03.mdoc";
  slug: "2024-03";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2024-04.mdoc": {
	id: "2024-04.mdoc";
  slug: "2024-04";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2024-05.mdoc": {
	id: "2024-05.mdoc";
  slug: "2024-05";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2024-06.mdoc": {
	id: "2024-06.mdoc";
  slug: "2024-06";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2024-07.mdoc": {
	id: "2024-07.mdoc";
  slug: "2024-07";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
"2024-08.mdoc": {
	id: "2024-08.mdoc";
  slug: "2024-08";
  body: string;
  collection: "changelogs";
  data: InferEntrySchema<"changelogs">
} & { render(): Render[".mdoc"] };
};
"fragments": {
"backing-fields.mdoc": {
	id: "backing-fields.mdoc";
  slug: "backing-fields";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"brew-tour-2024.mdoc": {
	id: "brew-tour-2024.mdoc";
  slug: "brew-tour-2024";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"data-structures.mdoc": {
	id: "data-structures.mdoc";
  slug: "data-structures";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"degenerative-myelopathy.mdoc": {
	id: "degenerative-myelopathy.mdoc";
  slug: "degenerative-myelopathy";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"first-fragment.mdoc": {
	id: "first-fragment.mdoc";
  slug: "first-fragment";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"get-there-itis.mdoc": {
	id: "get-there-itis.mdoc";
  slug: "get-there-itis";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"jazz-at-night.mdoc": {
	id: "jazz-at-night.mdoc";
  slug: "jazz-at-night";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"new-spaces.mdoc": {
	id: "new-spaces.mdoc";
  slug: "new-spaces";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"photos.mdoc": {
	id: "photos.mdoc";
  slug: "photos";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"taskwarrior-hooks.mdoc": {
	id: "taskwarrior-hooks.mdoc";
  slug: "taskwarrior-hooks";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"the-new-internet.mdoc": {
	id: "the-new-internet.mdoc";
  slug: "the-new-internet";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"tokyo-focus-tracks.mdoc": {
	id: "tokyo-focus-tracks.mdoc";
  slug: "tokyo-focus-tracks";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"ux-performance-in-blazor.mdoc": {
	id: "ux-performance-in-blazor.mdoc";
  slug: "ux-performance-in-blazor";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
} & { render(): Render[".mdoc"] };
"work-places.mdoc": {
	id: "work-places.mdoc";
  slug: "work-places";
  body: string;
  collection: "fragments";
  data: InferEntrySchema<"fragments">
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
"photos": {
"atacama-skies-2023.mdoc": {
	id: "atacama-skies-2023.mdoc";
  slug: "atacama-skies-2023";
  body: string;
  collection: "photos";
  data: any
} & { render(): Render[".mdoc"] };
"bicycle-2024.mdoc": {
	id: "bicycle-2024.mdoc";
  slug: "bicycle-2024";
  body: string;
  collection: "photos";
  data: any
} & { render(): Render[".mdoc"] };
"el-loa-airport-2023.mdoc": {
	id: "el-loa-airport-2023.mdoc";
  slug: "el-loa-airport-2023";
  body: string;
  collection: "photos";
  data: any
} & { render(): Render[".mdoc"] };
"magdalena-island-2023.mdoc": {
	id: "magdalena-island-2023.mdoc";
  slug: "magdalena-island-2023";
  body: string;
  collection: "photos";
  data: any
} & { render(): Render[".mdoc"] };
"salar-de-atacama-2023.mdoc": {
	id: "salar-de-atacama-2023.mdoc";
  slug: "salar-de-atacama-2023";
  body: string;
  collection: "photos";
  data: any
} & { render(): Render[".mdoc"] };
"toronto-2024.mdoc": {
	id: "toronto-2024.mdoc";
  slug: "toronto-2024";
  body: string;
  collection: "photos";
  data: any
} & { render(): Render[".mdoc"] };
"torres-del-paine-2023.mdoc": {
	id: "torres-del-paine-2023.mdoc";
  slug: "torres-del-paine-2023";
  body: string;
  collection: "photos";
  data: any
} & { render(): Render[".mdoc"] };
"valle-de-la-luna-2023.mdoc": {
	id: "valle-de-la-luna-2023.mdoc";
  slug: "valle-de-la-luna-2023";
  body: string;
  collection: "photos";
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
"blazor-a-review-and-primer-for-ui-devs.mdoc": {
	id: "blazor-a-review-and-primer-for-ui-devs.mdoc";
  slug: "blazor-a-review-and-primer-for-ui-devs";
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

	export type ContentConfig = typeof import("../../src/content/config.js");
}
