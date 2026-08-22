## Frontend Architecture

`ui/`
Base reusable primitives.

`motion/`
Reusable Motion.dev wrappers.

`premium/`
Branded application-level enhanced components.

`vendors/`
Third-party Kokonut and React Bits adapters.

`marketing/`
Landing page-specific components.

`dashboard/`
Dashboard-specific components.

`lib/animations.js`
Shared Motion variants and viewport presets.

`lib/motion-tokens.js`
Motion timing, easing, and spring tokens.

Rules:

- Never import vendor components directly inside `marketing/` or `dashboard/`.
- Prefer existing reusable components before creating a new one.
- Keep route files in `app/routes/` and compose from shared components.
- Put one-off section markup inside the relevant `marketing/` or `dashboard/` folder, not `ui/`.
