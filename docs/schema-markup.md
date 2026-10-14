# Schema markup: what it is and what this template does

**What it is:** schema markup (also called structured data or JSON-LD) is hidden code in a page that states facts in a
format Google reads easily: "this is a hair salon, here is the phone number, these are the opening hours." Visitors never
see it. It helps Google understand the page and can make search results richer.

**It does not guarantee rankings.** Google decides what to show. Think of it as helping Google get the facts right.

## What is added automatically

| Where | Type | What it tells Google |
|---|---|---|
| Every page | `LocalBusiness` | Business name, description, phone, email, address, opening hours, area served, social links |
| Every inner page | `BreadcrumbList` | The trail "Home > Services" |
| FAQ page | `FAQPage` | Each question and its answer |
| Each blog post | `BlogPosting` | Headline, date, author, cover picture |

The code is in `src/lib/schema.ts` and the layout prints it in `src/layouts/BaseLayout.astro`.
Empty fields are left out automatically, so Google never receives blank values.

## What you must fill in for each client (`src/content/developer.json`)

```json
"schemaType": "HairSalon",          // a more specific type than LocalBusiness if one fits
"priceRange": "$$",
"areaServed": "Pretoria",
"schemaAddress": { "streetAddress": "...", "addressLocality": "...", "addressRegion": "Gauteng",
                   "postalCode": "...", "addressCountry": "ZA" },
"openingHours": ["Mo-Fr 08:00-17:00", "Sa 09:00-13:00"],
"latitude": "-25.7461", "longitude": "28.1881"
```

- Pick the most specific type from <https://schema.org/LocalBusiness> (look at the list of subtypes, for example
  `Restaurant`, `Bakery`, `HairSalon`, `Plumber`, `LaundryService`). If unsure, leave `LocalBusiness`.
- **`openingHours` must match the opening hours text in the CMS.** Format: `Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`, then the
  24-hour times. Example: `Mo-Fr 08:00-17:00`. If the client changes their hours in the CMS, update this line too.
- The name, address and phone must match the Google Business Profile exactly.

## How to test it

1. After the site is live, open <https://search.google.com/test/rich-results> and enter a page address.
2. Fix any errors it reports. Warnings about optional fields are fine.
3. Do **not** add fake reviews or star ratings to schema. Google may penalise a site for it.
