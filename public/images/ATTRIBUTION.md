# Image attribution

## `hero-students.jpg`

- **Source:** school-provided asset (supplied directly to the project; not
  sourced from any third-party host or stock service).
- **Used as:** the landing-page hero background (`src/components/HomeHero.tsx`).

The file is served locally from `/public/images` and the site never requests
any image from a third-party host, so the strict Content-Security-Policy in
`next.config.ts` (`img-src 'self' blob: data:`) stays intact and no external
request is made on page load.

The photograph shows three Nigerian students in navy-and-gold school uniforms
outside a school building in bright daylight. It contains no signage, text, or
logos. It is used as a generic school photograph; the alt text describes the
scene rather than claiming it is a photograph of Crestfield Academy students.
