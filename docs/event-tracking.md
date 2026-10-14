# Event tracking in GA4 (Premium)

**What it adds:** a normal GA4 install counts visits. Event tracking counts **actions**: how many people tapped WhatsApp,
tapped the phone number, tapped the email, or sent the contact form. For a small business these are the numbers that
matter, because each one is a potential customer.

## What is tracked (nothing to configure)

| What the visitor does | Event name in GA4 |
|---|---|
| Taps any WhatsApp link (including the floating button) | `whatsapp_click` |
| Taps a phone number link | `call_click` |
| Taps an email link | `email_click` |
| Sends the contact form successfully | `generate_lead` |

The code is in `src/scripts/tracking.ts`. It watches every link click on the site, so any link you add later
with `wa.me`, `tel:` or `mailto:` is tracked automatically. Each event also records which page it happened on.

It only runs when `ga4Id` is filled in (see `ga4-setup.md`) and only on the live site.

> **TeKStak Studios note:** this site has no WhatsApp or phone links on its pages, because the contact form opens the
> WhatsApp chat itself. So the numbers that matter here are `generate_lead` (form sent) and `email_click`. The WhatsApp
> and call events are still switched on and will start counting if you ever add a `wa.me` or `tel:` link.

## Turn them into "key events" (once per client)

1. In GA4 go to **Admin > Data display > Events** (the menu may be named slightly differently).
2. Wait until the events appear (it can take up to a day after the first real click). Test by tapping the WhatsApp button on the live site, then check **Reports > Realtime**.
3. Next to `generate_lead`, `whatsapp_click` and `call_click`, switch on **Mark as key event**.
4. Now the client can see key events in their reports.

## Show the client the numbers

In **Reports > Engagement > Events**, click an event name to see which pages produce the most contacts.
A simple monthly message works well: "This month your website sent you 41 WhatsApp taps, 12 calls and 6 form enquiries."

## Adding another event later

In any page you can add `onclick="gtag('event', 'my_event_name')"` to a button, or extend `tracking.ts`.
Event names: lowercase letters and underscores only.

## Test it

Open the live site, tap a WhatsApp link, and watch **Reports > Realtime** in GA4. You should see `whatsapp_click`.
(Use a private browser window if you have an ad blocker, as blockers can hide GA events.)
