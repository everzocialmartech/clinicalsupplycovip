# Saliva Ejectors VIP Page

A second VIP page at `/salivaejectors`, built as a copy of the current homepage with the same premium look — dark navy gradient, Jost type, white buttons, star rating, thank-you popup — but rewritten around the saliva ejectors.

## Flow

Same two-step private experience as today:

1. **Step 1 — Who you are:** Name, Position, Practice Name. All required to continue.
2. **Step 2 — Feedback:** product reveal with the pop-up animation, star rating, "Would you order them again?" (Yes / Maybe / No pills), and two written questions.
3. **Thank-you popup** with the $25 credit and the IAMVIP code.

## Copy

Hero: eyebrow "WELCOME BACK", headline "YOU'RE STILL IN THE 1%.", short supporting lines about coming back to a customer whose opinion CSC trusts, and "No sales pitch. No 'right' answer."

Feedback step:
- "So… how were the saliva ejectors?" intro, kept short.
- "You're the expert here." — a short warm note that CSC would rather ask people using the product daily.
- Rating: "How would you rate the saliva ejectors?" with "Be honest. You won't hurt our feelings." under the stars.
- "Would you order them again?" — Yes / Maybe / No.
- "What did your team actually think?" (placeholder: "Tell us what you liked, what you didn't, or what you'd change.")
- "What would make these a 'yes, we're reordering' product for your practice?"
- Note that the $25 credit is not tied to a positive review.

Popup: "Thank you. Seriously." + credit ready, code IAMVIP, "And yes — you're still in the 1%. We'll be back."

## Product image

The new page uses a placeholder saliva ejector image until you upload a photo; send it over and I'll swap it in, cropped and animated the same way as the sponges.

## Submissions

This page posts to its own separate Google Sheet. Send me the new Apps Script web app URL and I'll wire it in. Until then the form works end to end and shows the thank-you popup; nothing is recorded.

## Technical notes

- New `src/pages/SalivaEjectors.tsx` (copy of `Index.tsx` structure) plus a `SalivaThankYouModal`, route added in `App.tsx` at `/salivaejectors`. Existing `/` page untouched.
- Reuses `StarRating`, `FadeSection` scroll-fade, `animate-pop-up-grow`, and the existing button/input classes.
- Adds a pill-button group for the reorder answer; required fields: all three profile fields, rating, reorder choice, and the "what did your team think" text. Second written question optional.
- Submit posts JSON (name, position, practice, rating, reorderAgain, teamThoughts, reorderTrigger) with `mode: "no-cors"` to a new script URL constant, left blank until you provide it.
