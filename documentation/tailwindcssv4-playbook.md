# Tailwind CSS v4 Playbook

A developer's guide to styling approaches in Tailwind CSS v4, ordered from most convenient (least control) to least convenient (most control).

## 1. Built-in Utility Classes (Most Convenient)

**When to use:** For standard styling needs with Tailwind's design system.

```html
<!-- Colors -->
<a class="text-violet-600 hover:text-violet-700 dark:text-violet-500">Link</a>

<!-- Layout -->
<div class="flex items-center space-x-4 p-6 bg-white dark:bg-gray-900">
  Content
</div>

<!-- Responsive -->
<h1 class="text-lg md:text-xl lg:text-2xl">Responsive heading</h1>
```

**Pros:** Zero setup, consistent design tokens, responsive variants built-in
**Cons:** Limited to Tailwind's predefined values

## 2. Tailwind Typography Plugin (High Convenience)

**When to use:** For rich text content like blog posts, documentation, or markdown.

```html
<!-- Basic prose styling -->
<article class="prose prose-lg max-w-none">
  <h1>Article Title</h1>
  <p>Article content with automatic typography styling...</p>
</article>

<!-- Custom prose variant -->
<article class="prose prose-violet max-w-none">
  <!-- Links automatically get violet styling with animated underlines -->
  <p>Check out <a href="#">this link</a> for more info.</p>
</article>
```

**Setup required:**
```css
@plugin "@tailwindcss/typography";

@utility prose-violet {
  --tw-prose-links: theme(colors.violet.600);
  --tw-prose-invert-links: theme(colors.violet.500);
  /* ... other prose customizations */
}

.prose-violet a {
  @apply link-underline link-hover-slide dark:link-underline-dark 
         text-accent hover:text-accent-hover 
         md:text-content md:dark:text-neutral-primary;
}
```

**Pros:** Automatic typography styling, handles all text elements
**Cons:** Less control over individual elements

## 3. Custom Utility Classes (Medium Convenience)

**When to use:** For reusable single-purpose styles that aren't in Tailwind's defaults.

```html
<!-- Semantic colors -->
<p class="text-content">Body text that adapts to light/dark mode</p>
<button class="text-accent hover:text-accent-hover">Interactive element</button>

<!-- Custom animations -->
<div class="link-underline link-hover-slide">Animated underline</div>

<!-- Layout utilities -->
<section class="page-section">
  <h2 class="section-heading">Section Title</h2>
</section>
```

**Setup required:**
```css
/* Semantic text colors */
@utility text-content {
  color: var(--color-text-neutral-primary);
}

@utility text-accent {
  color: var(--color-brand-primary);
}

@utility text-accent-hover {
  color: var(--color-brand-secondary);
}

/* Animation utilities */
@utility link-underline {
  text-decoration: none;
  cursor: pointer;
  background: linear-gradient(90deg, var(--color-brand-primary) 50%, var(--color-brand-muted) 50%) no-repeat 100% 100% / 200% 2px;
  transition: background-position .3s, color .6s;
}

@utility link-hover-slide {
  &:hover {
    background-position: 0% 100%;
  }
}
```

**Pros:** Reusable, composable, semantic naming
**Cons:** Requires CSS definitions, more setup

## 4. Component Classes (Lower Convenience)

**When to use:** For complex, repeated UI patterns that would be cumbersome as utility combinations.

```html
<!-- Instead of repeating long utility combinations -->
<a class="link-animated">Styled link</a>

<!-- Equivalent to: -->
<a class="link-underline link-hover-slide dark:link-underline-dark text-accent hover:text-accent-hover md:text-content md:dark:text-neutral-primary">
  Long utility combination
</a>
```

**Setup required:**
```css
@layer components {
  .link-animated {
    @apply link-underline link-hover-slide dark:link-underline-dark 
           text-accent hover:text-accent-hover 
           md:text-content md:dark:text-neutral-primary;

    @variant dark {
      @apply link-underline-dark md:text-accent;
    }
  }
}
```

**Pros:** Encapsulates complex patterns, single class name
**Cons:** Less flexible, harder to customize per-use

## 5. Custom CSS with Variants (Least Convenient, Most Control)

**When to use:** For highly specific styling that doesn't fit utility patterns.

```css
.custom-element {
  /* Base styles */
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  
  /* Responsive */
  @media (width >= theme(--breakpoint-md)) {
    background-size: 200% 200%;
  }
  
  /* Dark mode */
  @variant dark {
    background: linear-gradient(45deg, #ff8e8e, #6ee7db);
  }
  
  /* Hover */
  &:hover {
    animation: gradient-shift 2s ease infinite;
  }
}
```

**Pros:** Complete control, can do anything CSS can do
**Cons:** Most verbose, hardest to maintain, least reusable

## Design System Setup

### 1. Define Semantic Colors in @theme

```css
@theme {
  /* Semantic colors */
  --color-brand-primary: theme(colors.violet.600);
  --color-brand-secondary: theme(colors.violet.700);
  --color-brand-muted: theme(colors.violet.300);
  
  --color-text-neutral-primary: theme(colors.gray.900);
  --color-text-neutral-secondary: theme(colors.gray.600);
  --color-text-neutral-tertiary: theme(colors.gray.500);
}
```

### 2. Dark Mode Variants

Use Tailwind's standard `dark:` variant pattern:

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  Content that adapts to theme
</div>
```

### 3. Custom Variant Definition

```css
@variant dark (&:where(.dark, .dark *));
```

## Best Practices

### 1. Start Simple, Add Complexity as Needed
- Begin with built-in utilities
- Create custom utilities for repeated patterns
- Use component classes for complex combinations
- Write custom CSS only when necessary

### 2. Semantic Naming
- Use `text-content` instead of `text-gray-900`
- Use `text-accent` instead of `text-violet-600`
- Makes theme changes easier

### 3. Utility Composition
```css
/* Good: Composable utilities */
@utility link-underline { /* underline animation */ }
@utility link-hover-slide { /* hover behavior */ }

/* Usage */
<a class="link-underline link-hover-slide text-accent">Link</a>
```

### 4. Avoid Duplication
```css
/* Good: Reusable utilities */
.prose-violet a {
  @apply link-underline link-hover-slide text-accent hover:text-accent-hover;
}

.link-animated {
  @apply link-underline link-hover-slide text-accent hover:text-accent-hover;
}
```

## Decision Tree

1. **Is it a standard design need?** → Use built-in utilities
2. **Is it rich text content?** → Use Typography plugin
3. **Is it a single reusable style?** → Create custom utility
4. **Is it a complex repeated pattern?** → Create component class
5. **Is it highly specific/unique?** → Write custom CSS

## Common Patterns

### Interactive Elements
```html
<!-- Links -->
<a class="text-accent hover:text-accent-hover">Standard link</a>
<a class="link-animated">Animated link</a>

<!-- Buttons -->
<button class="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded">
  Button
</button>
```

### Layout Sections
```html
<section class="page-section">
  <h2 class="section-heading">Section Title</h2>
  <div class="prose prose-violet">
    <!-- Rich content -->
  </div>
</section>
```

### Responsive Design
```html
<!-- Mobile-first approach -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<!-- Different layouts -->
<div class="block md:flex md:items-center md:space-x-4">
  Responsive layout
</div>
```

This playbook provides a structured approach to styling in Tailwind CSS v4, helping you choose the right tool for each situation while maintaining consistency and reusability.
