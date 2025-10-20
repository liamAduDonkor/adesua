Mapping current components to structfrontend.md

- components/layout/Navbar.tsx -> wraps `components/app-sidebar-header.tsx`
- components/layout/Sidebar.tsx -> wraps `components/app-sidebar.tsx`
- components/layout/Footer.tsx -> wraps `components/nav-footer.tsx`
- App shell remains `components/app-shell.tsx` (variant header/sidebar)

Notes
- This preserves existing imports and provides a path that matches the target Next.js struct for smoother migration.

