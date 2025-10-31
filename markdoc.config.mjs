import { defineMarkdocConfig, nodes, component } from "@astrojs/markdoc/config";
import shiki from "@astrojs/markdoc/shiki";

export default defineMarkdocConfig({
  nodes: {
    heading: {
      ...nodes.heading, // Apply defaults for other options
      render: component("./src/components/Heading.astro"),
    },
    document: {
      ...nodes.document, // Apply defaults for other options
      render: null, // default 'article'
    },
    image: {
      ...nodes.image,
      render: component("./src/components/NveImage.astro"),
    },
  },
  tags: {
    section: {
      render: component("./src/components/Section.astro"),
      attributes: {
        classname: { type: String },
      },
    },
    spacer: {
      render: component("./src/components/Spacer.astro"),
      attributes: {
        size: { type: Number },
      },
    },
    diagram: {
      render: component("./src/components/NveDiagram.astro"),
      attributes: {
        light: { type: String },
        dark: { type: String },
        alt: { type: String },
      },
    },
  },
  extends: [
    shiki({
      themes: {
        dark: "material-theme-darker",
        light: "light-plus",
      },
      langs: [
        "astro",
        "typescript",
        "javascript",
        "razor",
        "csharp",
        "json",
        "yaml",
        "css",
        "scss",
        "html",
        "xml",
        "markdown",
        "bash",
        "shell",
        "powershell",
        "python",
        "plaintext",
      ],
    }),
  ],
});
