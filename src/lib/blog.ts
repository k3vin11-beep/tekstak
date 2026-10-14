// WHAT THIS FILE DOES: finds every blog post (each .md file in src/content/blog) and prepares them
// for the blog pages: newest first, with categories. Add a new .md file (or publish one in the CMS)
// and it appears on the blog automatically.
import type { ImageMetadata } from "astro";

type Frontmatter = {
  title: string;
  date: string | Date;
  category?: string;
  description: string;
  image: string;
  imageAlt: string;
  author?: string;
  draft?: boolean;
};

const modules = import.meta.glob<{ frontmatter: Frontmatter; Content: any }>("../content/blog/*.md", { eager: true });

export const slugify = (text: string) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const fm = mod.frontmatter;
    return {
      slug,
      title: fm.title,
      description: fm.description,
      image: fm.image,
      imageAlt: fm.imageAlt,
      author: fm.author,
      category: fm.category || "News",
      date: new Date(fm.date),
      draft: Boolean(fm.draft),
      Content: mod.Content,
    };
  })
  .filter((post) => !post.draft) // posts marked "draft" stay hidden
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export const categories = [...new Set(posts.map((p) => p.category))].map((name) => ({
  name,
  slug: slugify(name),
  count: posts.filter((p) => p.category === name).length,
}));

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-ZA", { year: "numeric", month: "long", day: "numeric" });
