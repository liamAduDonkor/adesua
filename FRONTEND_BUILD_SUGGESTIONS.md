## Adesua Frontend Build Suggestions

This document distills frontend.md into actionable guidance for building the ADESUA frontend (web-first with mobile in mind). It focuses on architecture, UI composition, and incremental delivery across portals.

### Architecture & Tech Choices
- **Stack**: Laravel + Inertia React (current) with Tailwind + shadcn-style primitives. Keep SSR enabled for fast first paint and SEO on public pages.
- **Directory shape**: Continue aligning to `structfrontend.md` by exposing layout aliases (Navbar/Sidebar/Footer) and grouping pages by role (`resources/js/pages/<role>`).
- **State management**: Start with React Query (server-state) + local component state. Introduce a light global store (Zustand/RTK) when cross-cutting UI state grows (notifications, user, feature flags).
- **Design system**: Consolidate UI components under `components/ui/` (Button, Input, Table, Card, Tabs), mirroring shadcn API. Favor composition over deep inheritance.

### Routing & Role Portals
- **Top-level routes** (done): `/student`, `/parent`, `/teacher`, `/school`, `/admin`, `/vendor`.
- **Role redirect**: Keep the `dashboard` route switching on `user.role` to the appropriate portal home.
- **Sidebar nav**: Add nested items per role (Student: Profile/Attendance/Academics/Wallet/Reports; Teacher: Attendance/Performance/Reports/Disciplinary; etc.). Hide items by role on the client and server.

### Authentication & Identity
- **Flows**: Keep Fortify screens; add views for Ghana Card KYC initiation, biometric capture (front-end placeholders), and parental consent.
- **Session UX**: Support 2FA, device recognition, and secure logout. Provide clear error/empty states.
- **Access control**: Gate routes server-side (Laravel middleware) and hide irrelevant UI client-side.

### Dashboards & Analytics
- **Executive/National**: Build KPI tiles and charts first (GER/NER, PTR, outcomes). Use a charting lib (Recharts/Chart.js/ECharts). Provide time/range filters.
- **Management/School**: Compliance scorecards, deployment status, alerts, budget utilization. Reuse a `KPIChart` and `ReportTable` primitives.
- **Performance**: Trend lines and cohort analysis for students/teachers. Ensure accessible color palettes and responsive legends.

### Core Modules
- **Student Management**: Registration form (Ghana Card fields), registry table with filters; attendance calendar; performance reports.
- **Teacher Management**: Qualification profile, attendance dashboard (support future biometric/GPS hooks), PTR visualization, disciplinary submission.
- **Course & Assessment**: Curriculum-aligned course list, mock exam setup, grading UI, report card generator.
- **Welfare & Safeguarding**: Incident reporting modal, parent notification hooks, restricted access dashboard.

### G-NEMFIS Wallet
- **Wallet UI**: Balance, top-up (Momo/Bank placeholders), history, app-PIN/tap-to-pay lock screen.
- **Marketplace**: Catalog browsing, checkout flow within closed-loop wallet, parental approvals for restricted items.
- **Parental Controls**: Spending limits, approvals, real-time notifications, remote suspend.

### Reporting & Administration
- **Report Builder**: Filters (region/school/level/date), export to PDF/Excel/CSV. Start with server-generated CSV, add PDF later.
- **Statutory Sets**: Stubs for EMIS census, Financial Audit, AML/CFT & Data Protection reports.
- **Inspection & Rating**: Submission form, score display, rating history.
- **PTA & Approvals**: Centralized approvals UI and basic PTA lists/levies/messages.

### Compliance, Privacy, Consent
- **Consent surfaces**: Data consent banner, settings page, parent/guardian consent for minors.
- **Auditability**: UI affordances to view audit trails (authorized roles only). Visual alerts for failed KYC/expired licenses.

### UX, Accessibility, Mobile/PWA
- **A11y**: WCAG 2.1—labels, focus rings, color contrast, keyboard navigation, skip links.
- **i18n**: Prepare strings for English + local languages; centralize via a translation util.
- **Responsive**: Mobile-first; test critical screens at 320–768–1024–1440 widths.
- **PWA**: Later milestone—manifest/service worker for offline caching of basic reads.

### Performance & Quality
- **Perf**: Code-split heavy charts/tables; prefetch Inertia visits; reuse list virtualization for large tables.
- **Error/Empty states**: Standardize skeletons and empty UI across tables and charts.
- **Testing**: Start with unit tests for utils/components; add RTL tests for forms/navigation; snapshot critical dashboards.

### Data & API Integration
- **Adapters**: Create thin API adapter layer under `lib/` for each domain (auth, students, teachers, wallet, reports). Keep UI decoupled from response shapes.
- **Pagination**: Standardize table pagination and filters; preserve query params in URLs.
- **Security**: Sanitize any rich text; never render untrusted HTML.

### Incremental Delivery Roadmap (Suggested)
1) Shell & Navigation
   - Finalize Navbar/Sidebar/Footer aliases, role-based sidebar trees, and guard wrappers.
2) Student/Teacher MVP
   - Student: Profile, Attendance, Academics (read-only), Wallet, Reports (basic tables)
   - Teacher: Attendance, Performance (stub), Reports, Disciplinary form
3) School/Admin Dashboards
   - KPI tiles, compliance cards, basic charts with filters
4) Wallet & Marketplace Basics
   - Balance/history UI, top-up stub flows, catalog browse
5) Reporting v1
   - Common report filters + CSV export, statutory stubs
6) Compliance & Consent
   - Consent modals, privacy settings, minor consent
7) Mobile/PWA polish
   - Install prompts, offline reads for light data

### Immediate Next Steps in Codebase
- Add nested sidebar items per role and link to the scaffolded pages.
- Create `components/ui` barrel for Button/Input/Table/Card/Tabs and refactor usages.
- Introduce a lightweight API wrapper in `resources/js/lib` with error handling and typed responses.
- Create shared `ReportTable` and `KPIChart` primitives and use them in Admin/School pages.
- Add role-based guards in layouts to hide irrelevant items aggressively.

This plan keeps the UI cohesive, incrementally shippable, and ready for deeper data integration as backend endpoints mature.


