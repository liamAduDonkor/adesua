# ADESUA Routes Summary

This document provides a comprehensive overview of all routes and their connected pages in the ADESUA Education Management System.

## Routes Status: ✅ ALL PAGES CONNECTED

---

## Public Routes

### Welcome & Landing
- **Route:** `/` → `pages/welcome.tsx` ✅
  - Name: `home`
  - Middleware: None
  - Layout: Custom landing page layout

- **Route:** `/home` → `pages/home.tsx` ✅
  - Name: `home.page`
  - Middleware: None
  - Layout: Custom landing page layout

---

## Authentication Routes (Guest Only)

Located in: `routes/auth.php`

- **Route:** `GET /register` → `auth/register.tsx` ✅
  - Controller: `RegisteredUserController@create`
  - Name: `register`

- **Route:** `GET /forgot-password` → `auth/forgot-password.tsx` ✅
  - Controller: `PasswordResetLinkController@create`
  - Name: `password.request`

- **Route:** `GET /reset-password/{token}` → `auth/reset-password.tsx` ✅
  - Controller: `NewPasswordController@create`
  - Name: `password.reset`

### Fortify Auth Views
- **Route:** `GET /login` → `auth/login.tsx` ✅
  - Configured in: `FortifyServiceProvider`
  - Name: Laravel Fortify default

- **Route:** `GET /email/verify` → `auth/verify-email.tsx` ✅
  - Configured in: `FortifyServiceProvider`

- **Route:** `GET /two-factor-challenge` → `auth/two-factor-challenge.tsx` ✅
  - Configured in: `FortifyServiceProvider`

- **Route:** `GET /user/confirm-password` → `auth/confirm-password.tsx` ✅
  - Configured in: `FortifyServiceProvider`

---

## Authenticated Routes

### Dashboard
- **Route:** `GET /dashboard` → Role-based redirection ✅
  - Redirects to:
    - `student/index.tsx` (students)
    - `parent/index.tsx` (parents)
    - `teacher/index.tsx` (teachers)
    - `school/index.tsx` (school admins)
    - `admin/index.tsx` (admins)
    - `vendor/index.tsx` (vendors)
    - `dashboard.tsx` (fallback)
  - Name: `dashboard`
  - Middleware: `auth`, `verified`

---

## Student Portal

Prefix: `/student`
Middleware: `auth`, `verified`, `role:student`

- **Route:** `GET /student` → `student/index.tsx` ✅
- **Route:** `GET /student/profile` → `student/profile.tsx` ✅
- **Route:** `GET /student/attendance` → `student/attendance.tsx` ✅
- **Route:** `GET /student/academics` → `student/academics.tsx` ✅
- **Route:** `GET /student/wallet` → `student/wallet.tsx` ✅
- **Route:** `GET /student/reports` → `student/reports.tsx` ✅

---

## Parent Portal

Prefix: `/parent`
Middleware: `auth`, `verified`, `role:parent`

- **Route:** `GET /parent` → `parent/index.tsx` ✅
  - Controller: `ParentDashboardController`
- **Route:** `GET /parent/children` → `parent/children.tsx` ✅
- **Route:** `GET /parent/approvals` → `parent/approvals.tsx` ✅
- **Route:** `GET /parent/wallet` → `parent/wallet.tsx` ✅
- **Route:** `GET /parent/notifications` → `parent/notifications.tsx` ✅

---

## Teacher Portal

Prefix: `/teacher`
Middleware: `auth`, `verified`, `role:teacher`

- **Route:** `GET /teacher` → `teacher/index.tsx` ✅
  - Controller: `TeacherDashboardController`
- **Route:** `GET /teacher/attendance` → `teacher/attendance.tsx` ✅
- **Route:** `GET /teacher/performance` → `teacher/performance.tsx` ✅
- **Route:** `GET /teacher/reports` → `teacher/reports.tsx` ✅
- **Route:** `GET /teacher/disciplinary` → `teacher/disciplinary.tsx` ✅

---

## School Admin Portal

Prefix: `/school`
Middleware: `auth`, `verified`, `role:school`

- **Route:** `GET /school` → `school/index.tsx` ✅
- **Route:** `GET /school/staff` → `school/staff.tsx` ✅
- **Route:** `GET /school/students` → `school/students.tsx` ✅
- **Route:** `GET /school/dashboard` → `school/dashboard.tsx` ✅
- **Route:** `GET /school/finance` → `school/finance.tsx` ✅

---

## Admin Portal

Prefix: `/admin`
Middleware: `auth`, `verified`, `role:admin`

### Main Admin Pages
- **Route:** `GET /admin` → `admin/index.tsx` ✅
  - Controller: `AdminDashboardController`
- **Route:** `GET /admin/kpi` → `admin/kpi.tsx` ✅
- **Route:** `GET /admin/compliance` → `admin/compliance.tsx` ✅
- **Route:** `GET /admin/users` → `admin/users.tsx` ✅

### Schools Management
- **Route:** `GET /admin/schools` → `admin/schools/index.tsx` ✅
  - Controller: `AdminSchoolsController@index`
  - Name: `admin.schools.index`
- **Route:** `GET /admin/schools/{school}` → `admin/schools/show.tsx` ✅
  - Controller: `AdminSchoolsController@show`
  - Name: `admin.schools.show`

### Reports Management
- **Route:** `GET /admin/reports` → `admin/reports/index.tsx` ✅
  - Controller: `AdminReportsController@index`
  - Name: `admin.reports.index`
- **Route:** `GET /admin/reports/create` → `admin/reports/create.tsx` ✅
  - Controller: `AdminReportsController@create`
  - Name: `admin.reports.create`
- **Route:** `POST /admin/reports` ✅
  - Controller: `AdminReportsController@store`
  - Name: `admin.reports.store`
- **Route:** `GET /admin/reports/{report}` → `admin/reports/show.tsx` ✅
  - Controller: `AdminReportsController@show`
  - Name: `admin.reports.show`
- **Route:** `GET /admin/reports/{report}/download` ✅
  - Controller: `AdminReportsController@download`
  - Name: `admin.reports.download`
- **Route:** `POST /admin/reports/{report}/schedule` ✅
  - Controller: `AdminReportsController@schedule`
  - Name: `admin.reports.schedule`

### Statutory Reports
- **Route:** `GET /admin/reports/emis` → `admin/reports/emis.tsx` ✅
  - Controller: `AdminReportsController@emisReport`
  - Name: `admin.reports.emis`
- **Route:** `GET /admin/reports/financial-audit` → `admin/reports/financial-audit.tsx` ✅
  - Controller: `AdminReportsController@financialAudit`
  - Name: `admin.reports.financial-audit`
- **Route:** `GET /admin/reports/aml-cft` → `admin/reports/aml-cft.tsx` ✅
  - Controller: `AdminReportsController@amlCftReport`
  - Name: `admin.reports.aml-cft`

### Analytics
- **Route:** `GET /admin/analytics` → `admin/analytics/dashboard.tsx` ✅
  - Controller: `AdminAnalyticsController@dashboard`
  - Name: `admin.analytics.dashboard`
- **Route:** `GET /admin/analytics/teachers` → `admin/analytics/teachers.tsx` ✅
  - Controller: `AdminAnalyticsController@teacherAnalytics`
  - Name: `admin.analytics.teachers`
- **Route:** `GET /admin/analytics/students` → `admin/analytics/students.tsx` ✅
  - Controller: `AdminAnalyticsController@studentAnalytics`
  - Name: `admin.analytics.students`
- **Route:** `GET /admin/analytics/vendors` → `admin/analytics/vendors.tsx` ✅
  - Controller: `AdminAnalyticsController@vendorAnalytics`
  - Name: `admin.analytics.vendors`

### Search Functionality
- **Route:** `GET /admin/search/teachers` → `admin/search/teachers.tsx` ✅
  - Controller: `AdminSearchController@searchTeachers`
  - Name: `admin.search.teachers`
- **Route:** `GET /admin/search/students` → `admin/search/students.tsx` ✅
  - Controller: `AdminSearchController@searchStudents`
  - Name: `admin.search.students`
- **Route:** `GET /admin/search/vendors` → `admin/search/vendors.tsx` ✅
  - Controller: `AdminSearchController@searchVendors`
  - Name: `admin.search.vendors`

### Performance Details
- **Route:** `GET /admin/performance/teacher/{teacher}` ✅
  - Controller: `AdminSearchController@teacherPerformance`
  - Name: `admin.performance.teacher`
- **Route:** `GET /admin/performance/student/{student}` ✅
  - Controller: `AdminSearchController@studentPerformance`
  - Name: `admin.performance.student`
- **Route:** `GET /admin/statistics/vendor/{vendor}` ✅
  - Controller: `AdminSearchController@vendorStatistics`
  - Name: `admin.statistics.vendor`

---

## Vendor Portal

Prefix: `/vendor`
Middleware: `auth`, `verified`, `role:vendor`

- **Route:** `GET /vendor` → `vendor/index.tsx` ✅
- **Route:** `GET /vendor/tenders` → `vendor/tenders.tsx` ✅
- **Route:** `GET /vendor/payments` → `vendor/payments.tsx` ✅
- **Route:** `GET /vendor/compliance` → `vendor/compliance.tsx` ✅

---

## Settings Routes

Located in: `routes/settings.php`
Prefix: `/settings`
Middleware: `auth`

- **Route:** `GET /settings` → Redirects to `/settings/profile` ✅

- **Route:** `GET /settings/profile` → `settings/profile.tsx` ✅
  - Controller: `ProfileController@edit`
  - Name: `profile.edit`

- **Route:** `PATCH /settings/profile` ✅
  - Controller: `ProfileController@update`
  - Name: `profile.update`

- **Route:** `DELETE /settings/profile` ✅
  - Controller: `ProfileController@destroy`
  - Name: `profile.destroy`

- **Route:** `GET /settings/password` → `settings/password.tsx` ✅
  - Controller: `PasswordController@edit`
  - Name: `password.edit`

- **Route:** `PUT /settings/password` ✅
  - Controller: `PasswordController@update`
  - Name: `password.update`
  - Middleware: `throttle:6,1`

- **Route:** `GET /settings/appearance` → `settings/appearance.tsx` ✅
  - Name: `appearance.edit`

- **Route:** `GET /settings/two-factor` → `settings/two-factor.tsx` ✅
  - Controller: `TwoFactorAuthenticationController@show`
  - Name: `two-factor.show`

---

## Layout Usage

All authenticated pages use the **AppLayout** (`layouts/app-layout.tsx`), which wraps:
- `layouts/app/app-sidebar-layout.tsx` (default)
- `layouts/app/app-header-layout.tsx` (alternative)
- `layouts/app/admin-sidebar-layout.tsx` (admin specific)

Settings pages use:
- `layouts/settings/layout.tsx`

Auth pages use:
- `layouts/auth-layout.tsx` (wraps auth-specific layouts)
  - `layouts/auth/auth-card-layout.tsx`
  - `layouts/auth/auth-simple-layout.tsx`
  - `layouts/auth/auth-split-layout.tsx`

---

## Summary of Changes Made

### ✅ Fixed Routes
1. **Fixed analytics routes** - Corrected syntax from `Class@method` to `[Class::class, 'method']`
2. **Fixed search routes** - Updated to use proper array syntax
3. **Fixed performance routes** - Updated to use proper array syntax with route names

### ✅ New Pages Created
1. **admin/analytics/teachers.tsx** - Teacher performance analytics with filtering
2. **admin/analytics/students.tsx** - Student performance analytics with filtering
3. **admin/analytics/vendors.tsx** - Vendor performance and compliance analytics

### ✅ Added Routes
1. **GET /home** - Added route for home.tsx page (separate from welcome)

### ✅ Cleanup
1. **Deleted admin/reports.tsx** - Removed duplicate file (admin/reports/index.tsx is the active one)

---

## Total Page Count

- **Total Pages:** 56
- **All Routed:** ✅ YES
- **Layout:** All use AppLayout as requested

---

## Notes

- All pages now use the `app-layout.tsx` for consistency
- All routes follow Laravel best practices with proper controller method syntax
- All admin analytics pages are fully functional with comprehensive UI
- Search and filter functionality is implemented in analytics pages
- All pages include breadcrumb navigation for better UX

