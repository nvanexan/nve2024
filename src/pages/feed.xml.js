import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import Markdoc from "@markdoc/markdoc";
import ExtendedParser, {
  extendedNodes,
} from "@nvanexan/markdoc-extensions/dist/index.mjs";
import { defineMarkdocConfig } from "@astrojs/markdoc/config";

const config = defineMarkdocConfig({ nodes: extendedNodes });

export async function GET(context) {
  const parser = new ExtendedParser();

  const posts = await getCollection("posts");
  const blogItems = posts
    .filter((p) => !!p.data.published)
    .map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      content: sanitizeHtml(
        Markdoc.renderers.html(
          Markdoc.transform(parser.parse(post.body), config)
        )
      ),
    }));

  const changelogs = await getCollection("changelogs");
  const changelogItems = changelogs.map((changelog) => ({
    title: changelog.data.title,
    pubDate: changelog.data.date,
    description: changelog.data.description,
    link: `/changelog/${changelog.slug}/`,
    content: sanitizeHtml(
      Markdoc.renderers.html(
        Markdoc.transform(parser.parse(changelog.body), config)
      )
    ),
  }));

  const fragments = await getCollection("fragments");
  const fragmentItems = fragments.map((fragment) => ({
    title: fragment.data.title,
    pubDate: fragment.data.date,
    description: fragment.data.description,
    link: `/fragment/${fragment.slug}/`,
    content: sanitizeHtml(
      Markdoc.renderers.html(
        Markdoc.transform(parser.parse(fragment.body), config)
      )
    ),
  }));

  const items = [...blogItems, ...changelogItems, ...fragmentItems].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return rss({
    // `<title>` field in output xml
    title: "Changelog | Nick Van Exan",
    // `<description>` field in output xml
    description: "Monthly updates and blog posts from Nick Van Exan",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: items,
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
