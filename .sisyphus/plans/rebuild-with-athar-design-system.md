# Plan: Rebuild with Athar Design System

## TL;DR
> **Quick Summary**: Rebuild the application UI to match the "Athar-Website-Design-System" (Dark Mode default) while preserving the Hero section and core functionality.
> 
> **Deliverables**: 
> - Updated `globals.css` with Design System (DS) tokens (Colors, Fonts).
> - New/Ported DS primitives (`Button`, `Card`, `Badge`) in `components/ui`.
> - Refactored sections (`About`, `Services`, `Portfolio`, `Contact`, `Footer`) using DS components.
> - Hero Section remains UNTOUCHED.
> 
> **Estimated Effort**: Large (Significant UI overhaul).
> **Parallel Execution**: YES - Waves (Foundation -> Components -> Sections).
> **Critical Path**: Setup Fonts/Tokens -> Port Primitives -> Update Sections.

---

## Context

### Original Request
Rebuild the app with the same functionality to match the "Athar-Website-Design-System" (colors, fonts, components). Keep Hero section as is. No dark/light toggle (Dark Mode Default).

### Design System Findings
- **Source**: `Athar-Website-Design-System/src/design-system/` (React + CSS Modules/Variables).
- **Colors**: `--blue-1` to `5`, `--ink`, `--base`, `--accent` (Lime).
- **Typography**: `YearOfHandicrafts` (Sans/Display), `YearOfTheCamel` (Accent).
- **Components**: `Button`, `Card`, `Navbar`, `Tabs`, `KpiCard`.
- **Theme**: Dark Mode Default required (enforced via `.dark` class on `html`).

### Strategy
1.  **Foundation**: implementing DS tokens in `globals.css` mapped to Tailwind v4 theme.
2.  **Primitives**: Porting React components from DS to `components/ui` (replacing Shadcn where appropriate).
3.  **Sections**: Refactoring page sections to use new primitives and layout tokens.
4.  **Preservation**: Explicitly excluding `ResponsiveHeroBanner` from changes.

---

## Work Objectives

### Core Objective
Transform the app's visual identity to match "Athar-Website-Design-System" by adopting its tokens, typography, and component library.

### Concrete Deliverables
- `app/globals.css`: Updated with DS variables (`--blue-1`, `--ink`, etc.) in `.dark` block.
- `public/font/`: New font files added.
- `components/ui/`: Updated/New primitives (`button.tsx`, `card.tsx`, etc.) matching DS.
- `app/page.tsx` & Sections: Refactored to use new design.

### Definition of Done
- [ ] All sections (except Hero) match the new design system aesthetics.
- [ ] Fonts `YearOfHandicrafts` and `YearOfTheCamel` are loaded and used.
- [ ] Dark Mode is active by default without a toggle.
- [ ] Application builds and runs without errors.

### Must Have
- **Dark Mode Default**: `html` tag must have `class="dark"`.
- **DS Colors**: Use `--blue-1`, `--accent`, `--ink` as primary palette.
- **DS Fonts**: Correct font families applied.

### Must NOT Have (Guardrails)
- **NO Changes to Hero**: `components/ui/responsive-hero-banner.tsx` must NOT be modified.
- **NO Light Mode**: Do not implement a toggle or light theme styles for now.
- **NO Functionality Loss**: Forms, links, and interactions must remain working.

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES (Next.js/React environment).
- **Automated tests**: NO (UI refactor focus).
- **Agent-Executed QA**: MANDATORY for every task.

### Agent-Executed QA Scenarios

**Scenario: Dark Mode Default Verification**
  Tool: Playwright
  Steps:
    1. Navigate to: http://localhost:3000
    2. Assert: `html` tag has class `dark`.
    3. Assert: Background color matches DS `--ink` / `--base` (dark hex).
    4. Assert: Text color matches DS `--base` / `--blue-1` (light hex).
  Expected Result: App loads in dark mode automatically.

**Scenario: Design System Component Check**
  Tool: Playwright
  Steps:
    1. Navigate to: http://localhost:3000
    2. Locate: Any button in "Contact" or "Services" section (NOT Hero).
    3. Assert: Computed font-family includes "YearOfHandicrafts".
    4. Assert: Computed background-color matches DS `--accent` or `--blue-1` (depending on variant).
  Expected Result: Components reflect new design system styles.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation):
├── Task 1: Setup Fonts & Global Styles (DS Tokens)
└── Task 2: Configure Tailwind v4 Theme

Wave 2 (Primitives - Parallel):
├── Task 3: Port Button & Badge Components
├── Task 4: Port Card & Container Components
└── Task 5: Port Typography & Layout Utilities

Wave 3 (Sections - Parallel):
├── Task 6: Refactor About & Services Sections
├── Task 7: Refactor Portfolio & Process Sections
└── Task 8: Refactor Contact & Footer Sections

Wave 4 (Cleanup):
└── Task 9: Final QA & Cleanup
```

---

## TODOs

- [ ] 1. Setup Fonts & Global CSS Variables
  **What to do**:
  - Copy font files (`YearOfHandicrafts`, `YearOfTheCamel`) from `Athar-Website-Design-System/public/font/` to `public/font/`.
  - Update `app/layout.tsx` to load these fonts (using `next/font/local`).
  - Update `app/globals.css`:
    - Add `@font-face` definitions.
    - Add DS color variables (`--blue-1`...`--ink`, `--accent`) to `:root` and `.dark` blocks.
    - Ensure `.dark` values are the default (map `--background` to `--ink` etc.).
  
  **Must NOT do**:
  - Delete existing Shadcn variables yet (keep for compatibility during migration).

  **Recommended Agent**: `visual-engineering` (frontend-ui-ux)
  
  **Acceptance Criteria**:
  - [ ] Fonts are available in network tab.
  - [ ] `window.getComputedStyle(document.body).getPropertyValue('--accent')` returns correct value.

- [ ] 2. Configure Tailwind v4 Theme
  **What to do**:
  - Update `app/globals.css` `@theme` block.
  - Map Tailwind utility classes to DS variables:
    - `--color-primary` -> `--blue-1`
    - `--color-background` -> `--ink`
    - `--font-sans` -> `YearOfHandicrafts`
    - `--font-accent` -> `YearOfTheCamel`
  - Enforce Dark Mode: Ensure `html` has `class="dark"` in `app/layout.tsx`.

  **Recommended Agent**: `visual-engineering` (frontend-ui-ux)

  **Acceptance Criteria**:
  - [ ] `bg-background` applies the dark DS background color.
  - [ ] `text-primary` applies the DS primary blue.

- [ ] 3. Port Button & Badge Components
  **What to do**:
  - Read `Athar-Website-Design-System/src/design-system/components/primitives/Button.tsx` (and Badge).
  - Update `components/ui/button.tsx` (and badge) to match the DS implementation (styles, variants).
  - Ensure they still accept `className` and standard props.

  **Recommended Agent**: `visual-engineering` (frontend-ui-ux)

  **Acceptance Criteria**:
  - [ ] Button visually matches DS (hover states, padding, border-radius).
  - [ ] Existing usages in app still compile (props compatible or updated).

- [ ] 4. Port Card & Container Components
  **What to do**:
  - Read `Athar-Website-Design-System/src/design-system/components/primitives/Card.tsx`.
  - Update `components/ui/card.tsx` to match DS.
  - Create any missing container/wrapper components if defined in DS.

  **Recommended Agent**: `visual-engineering` (frontend-ui-ux)

  **Acceptance Criteria**:
  - [ ] Cards use DS background, border, and shadow tokens.

- [ ] 5. Refactor About & Services Sections
  **What to do**:
  - Update `components/ui/about-section.tsx` (or equivalent).
  - Update `components/ui/bento-grid-01.tsx` (Services).
  - Replace hardcoded colors/classes with new DS primitives and tokens.
  - Update typography to use `font-sans` and `font-accent`.

  **Recommended Agent**: `visual-engineering` (frontend-ui-ux)

  **Acceptance Criteria**:
  - [ ] About section matches DS aesthetic (dark, blue accents).
  - [ ] Services grid uses new Card styles.

- [ ] 6. Refactor Portfolio & Process Sections
  **What to do**:
  - Update `components/ui/project-showcase.tsx` (Portfolio).
  - Update `components/ui/radial-orbital-timeline.tsx` (Process).
  - Apply DS styling.

  **Recommended Agent**: `visual-engineering` (frontend-ui-ux)

  **Acceptance Criteria**:
  - [ ] Portfolio items use new Card/Image styles.
  - [ ] Timeline uses DS colors for lines/nodes.

- [ ] 7. Refactor Contact & Footer Sections
  **What to do**:
  - Update `components/ui/contact-section.tsx`.
  - Update `components/ui/footer.tsx`.
  - Use new Input/Form styling from DS (if available, otherwise adapt Shadcn Input).

  **Recommended Agent**: `visual-engineering` (frontend-ui-ux)

  **Acceptance Criteria**:
  - [ ] Contact form fields use DS input styles.
  - [ ] Footer uses correct background and link colors.

- [ ] 8. Final QA & Cleanup
  **What to do**:
  - Verify Hero section is 100% untouched and functional.
  - Verify Dark Mode is consistent across all pages.
  - Remove any unused CSS or legacy components.

  **Recommended Agent**: `quick` (git-master)

  **Acceptance Criteria**:
  - [ ] No visual regressions in Hero.
  - [ ] All pages visually consistent.
