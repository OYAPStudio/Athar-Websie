# Draft: Rebuild with Athar Design System

## Requirements (Confirmed)
- **Goal**: Rebuild app UI to match "Athar-Website-Design-System".
- **Functionality**: Must remains the same.
- **Hero Section**: MUST BE KEPT as is (do not touch).
- **Dark/Light Mode**: Do not implement toggle yet (stick to one default).
- **Tech Stack**: Next.js 16, Tailwind CSS v4, React 19.

## Technical Context
- **Current Styling**: Tailwind v4 with `@theme` block in `app/globals.css`.
- **Colors**: Currently using `oklch` values.
- **Components**: shadcn/ui architecture in `components/ui`.

## Open Questions
- **Design System Source**: The folder `Athar-Website-Design-System` is empty. Where are the specs (colors, fonts, layout)?
- **Rebuild Scope**: Is this a "reskin" (update CSS variables) or "rewrite" (replace component code)?
- **Default Theme**: Since toggle is disabled, which mode should be the default (Light or Dark)?
