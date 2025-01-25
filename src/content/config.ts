// @ts-ignore
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    socialImageUrl: z.string().optional(),
    date: z.date(),
    published: z.boolean().optional(),
  }),
});

const changelogs = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    published: z.boolean().optional(),
  }),
});

const fragments = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    published: z.boolean().optional(),
  }),
});

const about = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { posts, changelogs, fragments, about };
