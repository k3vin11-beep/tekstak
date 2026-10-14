# Writing and publishing blog posts (Premium)

## What the blog does

- Every post gets its own page with a cover photo, a date, a category and article schema markup.
- Every category gets its own page (`/blog/category/tips/`). A category appears automatically once it has a post.
- New posts appear at the top of the blog. Posts marked **Hide this post (draft)** stay hidden.
- The sitemap updates itself, so Google finds new posts.

## For the client (CMS)

1. Log in at `/admin/`, open **Blog posts**, click **New blog post**.
2. Fill in: Title, Publish date, Category, Short summary, Cover photo (+ description), and the Post text.
3. Click **Publish**. The post is live in a minute or two.

Writing tips to pass on:

- Write about questions customers really ask. One clear question per post.
- 300 to 800 words is plenty. Short paragraphs. Use headings (## in the editor, or the heading button).
- The **Short summary** is the text that shows on Google, so write it like a small advert (150 to 160 characters).
- Add a clear next step at the end: "Send us a WhatsApp message to book."
- Post consistently, for example twice a month, rather than 10 posts in one week.

## For you (developer)

- Posts are Markdown files in `src/content/blog/`. The file name becomes the web address.
- Add or rename categories: edit the `options` list under the `blog` collection in `public/admin/config.yml`.
  The categories shown on the website come from the posts themselves.
- Blog logic is in `src/lib/blog.ts`; pages are in `src/pages/blog/`.
- Not included yet (easy extras to sell): RSS feed, post search, pagination (add it when a client has 20+ posts), comments.
