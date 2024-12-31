# Frontend Development Guide

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Design System](#design-system)
4. [Components](#components)
5. [Animations](#animations)
6. [Best Practices](#best-practices)

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Font**: DM Sans (Google Fonts)
- **Icons**: Lucide Icons

## Project Structure
```
app/
├── components/     # Reusable UI components
├── lib/           # Utility functions and configurations
├── (routes)/      # App routes and pages
├── globals.css    # Global styles and CSS variables
└── layout.tsx     # Root layout with providers
```

## Design System

### Colors
We use HSL color values with CSS variables for theming support:
- `--background`: Main background color
- `--foreground`: Main text color
- `--primary`: Primary brand color
- `--secondary`: Secondary color for subtle elements
- `--muted`: Muted/subtle backgrounds
- `--accent`: Accent color for highlights
- `--border`: Border color
- `--ring`: Focus ring color

### Typography
- **Font Family**: DM Sans
- **Font Weights**:
  - Regular (400)
  - Medium (500)
  - Semibold (600)
  - Bold (700)

### Spacing
Follow Tailwind's spacing scale:
- `px-4`: Standard horizontal padding
- `py-10`: Standard vertical padding
- `gap-4`: Standard gap between elements
- `space-y-8`: Standard vertical spacing

### Components

#### Buttons
```jsx
// Primary Button
<Button>Get Started</Button>

// Secondary Button
<Button variant="outline">Learn More</Button>

// Ghost Button
<Button variant="ghost">Cancel</Button>
```

#### Cards
```jsx
<div className="rounded-xl bg-card text-card-foreground shadow border-2">
  <div className="p-6">
    {/* Card content */}
  </div>
</div>
```

#### Input Fields
```jsx
<div className="relative">
  <Input className="pl-10 h-12" placeholder="Enter text" />
  {/* Optional icon */}
  <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
</div>
```

## Animations

### Animation Variants
```typescript
// Fade In Up
const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

// Container with Stagger
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};
```

### Using Animations
```jsx
// Container with staggered children
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={container}
>
  <motion.div variants={fadeInUp}>
    {/* Content */}
  </motion.div>
</motion.div>
```

### Hover Animations
```jsx
// Hover effect with transition
className="transition-all duration-300 hover:-translate-y-1"
```

## Best Practices

### Performance
1. Use `viewport={{ once: true }}` for scroll-triggered animations
2. Lazy load images and heavy components
3. Minimize layout shifts with proper sizing
4. Use proper image formats and optimization

### Accessibility
1. Use semantic HTML elements
2. Ensure proper color contrast
3. Include proper ARIA labels
4. Support keyboard navigation
5. Test with screen readers

### Responsive Design
1. Mobile-first approach
2. Use Tailwind's responsive prefixes:
   ```jsx
   className="text-base md:text-lg lg:text-xl"
   ```
3. Test on multiple devices and screen sizes

### Code Organization
1. Keep components small and focused
2. Use consistent naming conventions
3. Group related styles and animations
4. Comment complex logic or animations
5. Follow the DRY principle

### Naming Conventions
- **Files**: Use kebab-case for files: `auth-button.tsx`
- **Components**: Use PascalCase: `AuthButton`
- **Hooks**: Use camelCase with 'use' prefix: `useAuthState`
- **Utils**: Use camelCase: `formatDate`
- **Types/Interfaces**: Use PascalCase with descriptive names: `UserProfile`

### State Management
1. Use React hooks for local state
2. Keep state as close as possible to where it's used
3. Lift state up only when necessary
4. Use context for global state when needed

### Error Handling
1. Implement proper error boundaries
2. Show user-friendly error messages
3. Log errors for debugging
4. Handle loading states gracefully

## Development Workflow
1. Start with mobile design
2. Add responsive breakpoints
3. Implement core functionality
4. Add animations last
5. Test thoroughly
6. Optimize performance

## Useful Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Add shadcn component
npx shadcn@latest add <component-name>

# Build for production
npm run build
```

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/icons/) 