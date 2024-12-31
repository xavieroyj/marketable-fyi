# Project File Structure

## Root Directory
- `.env` - Configuration
- `.eslintrc.json` - Linting
- `.gitignore` - Exclusions
- `components.json` - ShadcnUI
- `middleware.ts` - Subdomain Routing
- `next.config.mjs` - NextConfig
- `next-env.d.ts` - Types
- `package.json` - Dependencies
- `postcss.config.mjs` - Styling
- `README.md` - Documentation
- `tailwind.config.ts` - Theming
- `tsconfig.json` - TypeScript

## /app
- `favicon.ico` - Icon
- `globals.css` - Styles
- `layout.tsx` - Shell

### /app/api
- `auth/[...all]/route.ts` - Authentication
- `domains/route.ts` - Domain Management
- `domains/[domainId]/verify/route.ts` - Domain Verification
- `links/route.ts` - Link Management

### /app/[domain]
- `[slug]/page.tsx` - Dynamic Link Pages
- `[slug]/route.ts` - Link Routing

### /app/fonts
- Contains font assets - Typography

## /app/(home)
- `page.tsx` - Homepage

### /app/(home)/components
- `header.tsx` - Navigation
- `hero.tsx` - HeroSection
- `features.tsx` - Features
- `analytics.tsx` - Analytics
- `pricing.tsx` - Pricing
- `testimonials.tsx` - Reviews
- `faq.tsx` - Questions
- `cta.tsx` - CallToAction
- `footer.tsx` - Footer
- `animations.ts` - Animations

## /app/(auth)
- `layout.tsx` - AuthLayout
- `login/page.tsx` - LoginPage
- `register/page.tsx` - RegisterPage

### /app/(auth)/components
- `login-form.tsx` - LoginForm
- `register-form.tsx` - RegisterForm

## /app/(dashboard)
- `layout.tsx` - DashboardLayout
- `dashboard/page.tsx` - DashboardPage
- `dashboard/domains/page.tsx` - DomainsPage
- `dashboard/analytics/page.tsx` - AnalyticsPage
- `dashboard/settings/page.tsx` - SettingsPage

### /app/(dashboard)/components
- `app-sidebar.tsx` - Sidebar Component
- `create-link-button.tsx` - CreateButton
- `create-link-form.tsx` - LinkForm
- `add-domain-button.tsx` - AddDomainButton
- `domain-card.tsx` - DomainCard

## /components/ui
- `logo.tsx` - Logo
- `sidebar.tsx` - Sidebar Component
- `button.tsx` - Button Component
- `dialog.tsx` - Dialog Component
- `input.tsx` - Input Component
- `card.tsx` - Card Component

## /docs
- `File_Structure.md` - Navigation
- `Frontend_Guide.md` - Guidelines
- `Project_Requirement_Doc.md` - Requirements

## /hooks
- `use-mobile.tsx` - Mobile Detection
- Custom React hooks - Logic

## /lib
- `auth.ts` - Authorization
- `auth-client.ts` - ClientAuth
- `prisma-db.ts` - Database
- `utils.ts` - Utilities

## /prisma
- `schema.prisma` - Database Schema
- `seed.ts` - Database Seeding

## Generated Directories
- `.git/` - Version control directory
- `.next/` - Next.js build output
- `node_modules/` - Package dependencies
