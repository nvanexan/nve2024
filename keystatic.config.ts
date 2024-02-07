import { config, fields, collection, component } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
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
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "src/assets/images/posts",
            publicPath: "../../assets/images/posts/",
          },
        }),
      },
    }),
    changelogs: collection({
      label: "Changelogs",
      slugField: "title",
      path: "src/content/changelogs/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          defaultValue: "This is a description",
        }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "src/assets/images/changelogs",
            publicPath: "../../assets/images/changelogs/",
          },
        }),
      },
    }),
  },
});
