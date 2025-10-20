adesua-frontend/
│
├── app/                            # Next.js App Router root
│   ├── layout.tsx                  # Root layout (navbar, sidebar, theme)
│   ├── page.tsx                    # Landing / login redirect
│   │
│   ├── (auth)/                     # Public auth routes
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── verify/page.tsx
│   │
│   ├── dashboard/                  # Protected app area
│   │   ├── layout.tsx              # Shared dashboard layout
│   │   ├── page.tsx                # Redirects based on role
│   │   │
│   │   ├── student/                # Student Portal
│   │   │   ├── page.tsx            # Student home overview
│   │   │   ├── profile/page.tsx
│   │   │   ├── attendance/page.tsx
│   │   │   ├── academics/page.tsx
│   │   │   ├── wallet/page.tsx
│   │   │   └── reports/page.tsx
│   │   │
│   │   ├── parent/                 # Parent Portal
│   │   │   ├── page.tsx
│   │   │   ├── children/page.tsx
│   │   │   ├── approvals/page.tsx
│   │   │   ├── wallet/page.tsx
│   │   │   └── notifications/page.tsx
│   │   │
│   │   ├── teacher/                # Teacher Portal
│   │   │   ├── page.tsx
│   │   │   ├── attendance/page.tsx
│   │   │   ├── performance/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   └── disciplinary/page.tsx
│   │   │
│   │   ├── school/                 # School Admin Portal
│   │   │   ├── page.tsx
│   │   │   ├── staff/page.tsx
│   │   │   ├── students/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   └── finance/page.tsx
│   │   │
│   │   ├── admin/                  # GES / MoE Portal
│   │   │   ├── page.tsx
│   │   │   ├── kpi/page.tsx
│   │   │   ├── compliance/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   └── users/page.tsx
│   │   │
│   │   ├── vendor/                 # Vendor Portal
│   │   │   ├── page.tsx
│   │   │   ├── tenders/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   └── compliance/page.tsx
│   │
│   ├── api/                        # Next.js API proxy (optional)
│   │   └── [...path]/route.ts
│
├── components/                     # Reusable UI components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   │
│   ├── ui/                         # ShadCN-based shared UI
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Card.tsx
│   │   └── Tabs.tsx
│   │
│   ├── charts/
│   │   ├── KPIChart.tsx
│   │   ├── PTRChart.tsx
│   │   └── AttendanceChart.tsx
│   │
│   ├── forms/
│   │   ├── StudentForm.tsx
│   │   ├── TeacherForm.tsx
│   │   ├── VendorForm.tsx
│   │   └── ReportFilterForm.tsx
│   │
│   ├── modals/
│   │   ├── ApprovalModal.tsx
│   │   ├── WalletTopUpModal.tsx
│   │   ├── ConsentModal.tsx
│   │   └── IncidentReportModal.tsx
│   │
│   └── tables/
│       ├── StudentTable.tsx
│       ├── TeacherTable.tsx
│       ├── VendorTable.tsx
│       └── ReportTable.tsx
│
├── lib/                            # Utilities and API helpers
│   ├── api.ts                      # Axios setup with interceptors
│   ├── auth.ts                     # Token management, role redirect
│   ├── constants.ts
│   ├── hooks.ts                    # Custom React hooks
│   └── utils.ts
│
├── store/                          # Redux Toolkit store
│   ├── index.ts
│   ├── authSlice.ts
│   ├── userSlice.ts
│   ├── walletSlice.ts
│   ├── attendanceSlice.ts
│   └── notificationSlice.ts
│
├── public/                         # Static assets (logos, icons, etc.)
│   ├── logos/
│   ├── images/
│   └── manifest.json               # PWA manifest
│
├── styles/
│   ├── globals.css
│   └── theme.css
│
├── tests/                          # Jest + RTL tests
│   ├── components/
│   ├── pages/
│   └── store/
│
├── .env.example                    # Environment variable template
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
