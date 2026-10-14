// WHAT THIS FILE DOES: builds "schema markup" (also called structured data or JSON-LD).
// This is hidden code on the page that tells Google in plain facts: "this is a business, here is its
// address, phone number and opening hours" or "this page is an article" or "these are FAQs".
// Google can use it for richer search results. Nothing here is visible to visitors.
import site from "../config/site";

const clean = (value: unknown): any => {
  // removes empty values so we never send blank fields to Google
  if (Array.isArray(value)) return value.map(clean).filter((v) => v !== undefined);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const c = clean(v);
      if (c !== undefined && c !== "" && !(Array.isArray(c) && c.length === 0)) out[k] = c;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return value === null || value === "" ? undefined : value;
};

const abs = (path: string) => new URL(path, site.url).href;

// 1) The business itself. Added to EVERY page.
export function localBusinessSchema() {
  const s: any = site;
  return clean({
    "@context": "https://schema.org",
    "@type": s.schemaType || "LocalBusiness",
    "@id": abs("/#business"),
    name: s.name,
    description: s.description,
    url: abs("/"),
    image: abs("/og-default.jpg"),
    telephone: s.phone,
    email: s.email,
    priceRange: s.priceRange,
    areaServed: s.areaServed,
    address: s.schemaAddress ? { "@type": "PostalAddress", ...s.schemaAddress } : undefined,
    openingHours: s.openingHours,
    geo: s.latitude && s.longitude ? { "@type": "GeoCoordinates", latitude: s.latitude, longitude: s.longitude } : undefined,
    sameAs: [s.instagram, s.facebook].filter(Boolean),
  });
}

// 2) Breadcrumbs: the "Home > Services" trail Google can show under the page title.
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

// 3) FAQ page: lets Google understand each question and answer.
export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

// 4) Blog post: tells Google this is an article, who wrote it and when.
export function articleSchema(post: { title: string; description: string; date: Date; slug: string; author?: string; imageUrl?: string }) {
  return clean({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date.toISOString(),
    author: { "@type": "Person", name: post.author || site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: abs(`/blog/${post.slug}/`),
    image: post.imageUrl,
  });
}
