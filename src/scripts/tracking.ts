// WHAT THIS FILE DOES: event tracking for Google Analytics 4 (part of the Premium package).
// It reports to GA4 each time a visitor taps WhatsApp, a phone number or an email address, and each
// time the contact form is sent. Without this, GA4 only counts visits; with it the client can see how
// many people actually tried to contact them.
//
// Events sent:  whatsapp_click | call_click | email_click | generate_lead (form sent)
// In GA4, mark these as "key events" (see docs/event-tracking.md).
type GTag = (...args: unknown[]) => void;

function send(name: string, params: Record<string, unknown> = {}) {
  const gtag = (window as unknown as { gtag?: GTag }).gtag;
  if (typeof gtag === "function") gtag("event", name, { page_path: location.pathname, ...params });
}

// Catches every link click on the whole site, so new links are tracked automatically.
document.addEventListener("click", (event) => {
  const link = (event.target as Element | null)?.closest?.("a");
  if (!link) return;
  const href = link.getAttribute("href") || "";
  if (href.startsWith("https://wa.me/") || href.includes("whatsapp.com")) send("whatsapp_click", { link_url: href });
  else if (href.startsWith("tel:")) send("call_click", { link_url: href });
  else if (href.startsWith("mailto:")) send("email_click", { link_url: href });
});

// The contact form announces a successful send; we pass it on to GA4 as a "lead".
document.addEventListener("lead:sent", (event) => {
  send("generate_lead", { form_name: (event as CustomEvent).detail?.form ?? "contact" });
});
