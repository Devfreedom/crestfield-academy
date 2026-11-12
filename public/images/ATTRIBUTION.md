# Image attribution

## `hero-students.jpg`

- **Title:** Colours of Rural life (School Life in Tamilnadu)
- **Creator:** Nithi clicks
- **Source:** https://www.flickr.com/photos/47850033@N08/47393681652
- **License:** Creative Commons Attribution 2.0 (CC BY 2.0) —
  https://creativecommons.org/licenses/by/2.0/
- **Used as:** the landing-page hero background (`src/components/HomeHero.tsx`)

The file in this folder is a local, modified copy — the site never requests the
image from a third-party host, so the strict Content-Security-Policy in
`next.config.ts` stays intact and no external request is made on page load.

Modifications made to the copy:

- resized to 2048 × 1422 and re-encoded as a progressive JPEG;
- the school signboard and the parked car's number plate were blurred so that
  no third-party signage or text is legible;
- a slight contrast and saturation adjustment.

The photograph shows students in navy-blue school uniforms outside a school
building in bright daylight. It is used as a generic school photograph; the
alt text describes the scene rather than claiming it is a photograph of
Crestfield Academy students.
