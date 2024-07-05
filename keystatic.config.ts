import {
  config,
  fields,
  collection,
  singleton,
  component,
} from "@keystatic/core";

import react, { createElement } from "react";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "nvanexan",
      name: "nve2024",
    },
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      columns: ["title", "date", "published"],
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          defaultValue: "This is a description",
        }),
        socialImageUrl: fields.text({
          label: "Social Image URL",
          defaultValue: "/nve-social-logo.png",
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
          validation: {
            isRequired: true,
          },
        }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: false,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
          images: {
            directory: "public/images/posts",
            publicPath: "/images/posts/",
          },
          componentBlocks: {
            diagram: component({
              preview: ({ fields }) =>
                react.createElement(
                  "div",
                  {},
                  JSON.stringify(
                    `public/images/diagrams/dark/${fields.dark.value?.filename}`
                  )
                ),
              label: "Diagram",
              schema: {
                light: fields.image({
                  label: "Light",
                  directory: "public/images/diagrams/light",
                  publicPath: "/images/diagrams/light/",
                }),
                dark: fields.image({
                  label: "Dark",
                  directory: "public/images/diagrams/dark",
                  publicPath: "/images/diagrams/dark/",
                }),
                alt: fields.text({
                  label: "Alt text",
                }),
              },
            }),
          },
        }),
      },
    }),
    changelogs: collection({
      label: "Changelogs",
      slugField: "title",
      columns: ["title", "date", "published"],
      path: "src/content/changelogs/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          defaultValue: "This is a description",
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
          validation: {
            isRequired: true,
          },
        }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: false,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
          images: {
            directory: "public/images/changelogs",
            publicPath: "/images/changelogs/",
          },
        }),
      },
    }),
    fragments: collection({
      label: "Fragments",
      slugField: "title",
      columns: ["title", "date", "published"],
      path: "src/content/fragments/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          defaultValue: "This is a description",
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
          validation: {
            isRequired: true,
          },
        }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: false,
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
          images: {
            directory: "public/images/fragments",
            publicPath: "/images/fragments/",
          },
        }),
      },
    }),
    photos: collection({
      label: "Photos",
      slugField: "title",
      columns: ["sequence", "title", "date", "published"],
      path: "src/content/photos/*",
      format: { contentField: "content" },
      schema: {
        sequence: fields.integer({
          label: "Sequence",
          defaultValue: 0,
        }),
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          defaultValue: "This is a description",
        }),
        date: fields.date({
          label: "Date",
          defaultValue: { kind: "today" },
          validation: {
            isRequired: true,
          },
        }),
        published: fields.checkbox({
          label: "Published",
          defaultValue: false,
        }),
        orientation: fields.select({
          label: "Orientation",
          description: "Orientation of the photo",
          options: [
            { label: "Landscape", value: "landscape" },
            { label: "Portrait", value: "portrait" },
          ],
          defaultValue: "landscape",
        }),
        photo: fields.image({
          label: "Photo",
          directory: "public/images/photos",
          publicPath: "/images/photos/",
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          tables: true,
          images: {
            directory: "public/images/photos",
            publicPath: "/images/photos/",
          },
        }),
      },
    }),
  },
});
