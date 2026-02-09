# Summary: Rebuild with Athar Design System

## Plan Generated: rebuild-with-athar-design-system
I have created a comprehensive plan to rebuild your application's UI using the **Athar Website Design System** assets, while strictly preserving the Hero section and enforcing a **Dark Mode Default**.

**Key Decisions Made:**
- **Dark Mode Default**: Enforced via `html` class `.dark` in `layout.tsx`. No toggle.
- **Component Strategy**: We will **port** the React components (Button, Card, Badge) from the design system to replace/enhance existing Shadcn UI components.
- **Font Integration**: Will import `YearOfHandicrafts` and `YearOfTheCamel` from the design system assets.

**Scope:**
- **IN**: `globals.css` (Colors, Fonts), `components/ui/` (Primitives), Sections (`About`, `Services`, `Portfolio`, `Contact`, `Footer`).
- **OUT**: `components/ui/responsive-hero-banner.tsx` (Hero Section - Untouched).

**Guardrails Applied:**
- **Preservation**: Explicit check to ensure Hero section code is not modified.
- **Theming**: Dark mode variables are mapped as the default foundation.

**Auto-Resolved:**
- **Missing Design System**: Found and analyzed the populated `Athar-Website-Design-System` folder.
- **Tech Stack**: Confirmed Next.js 16 + Tailwind v4 structure.

Plan saved to: `.sisyphus/plans/rebuild-with-athar-design-system.md`
