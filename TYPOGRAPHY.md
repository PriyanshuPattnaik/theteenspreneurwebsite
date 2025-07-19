# TheTeenspreneur Typography System

## Overview
This document outlines the hybrid typography system implemented for TheTeenspreneur website, combining Space Grotesk for headers and Inter for body text to achieve a perfect balance of personality and readability.

## Font Stack

### Primary Fonts
- **Headers**: Space Grotesk (distinctive, modern, tech-forward)
- **Body Text**: Inter (maximum readability, neutral, professional)
- **Code**: JetBrains Mono (monospace for code snippets)

### Font Loading
Fonts are preloaded in `src/app.html` for optimal performance:
```html
<!-- Preload Critical Fonts -->
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" as="style">
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style">
```

## Typography Hierarchy

### Headers (Space Grotesk)

#### H1 - Hero Headlines
```css
.h1, .title-hero, h1 {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 4.5rem; /* 72px desktop */
  line-height: 1.1;
  letter-spacing: -0.02em;
}
```
**Usage**: Main hero text, major section headers

#### H2 - Section Headers
```css
.h2, .title-section, h2 {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 3.5rem; /* 56px desktop */
  line-height: 1.2;
  letter-spacing: -0.01em;
}
```
**Usage**: "What We're Building", "How It Works"

#### H3 - Subsection Headers
```css
.h3, .title-subsection, h3 {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 2rem; /* 32px */
  line-height: 1.3;
  letter-spacing: normal;
}
```
**Usage**: Program names, feature titles

#### H4 - Minor Headers
```css
.h4, h4 {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 1.5rem; /* 24px */
  line-height: 1.3;
  letter-spacing: normal;
}
```

### Body Text (Inter)

#### Body Text Large
```css
.text-primary, .body-primary, .body-text, p {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 1.125rem; /* 18px */
  line-height: 1.6;
}
```
**Usage**: Introductory paragraphs, key descriptions

#### Body Text Regular
```css
.text-secondary, .body-secondary {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 1rem; /* 16px */
  line-height: 1.65;
}
```
**Usage**: Standard paragraphs, descriptions

#### Emphasis Text
```css
.emphasis, strong {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
}
```

#### Caption/Small Text
```css
.caption, .small-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 0.875rem; /* 14px */
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
```
**Usage**: Labels, captions, metadata

## Special Typography

### Brand Text
```css
.brand-text {
  font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 700;
  font-size: 1.5rem; /* 24px */
  line-height: 1.1;
  letter-spacing: -0.01em;
  text-transform: lowercase;
}
```

### Quote Text
```css
.quote-text {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 400;
  font-size: 1.375rem; /* 22px */
  line-height: 1.5;
  font-style: italic;
}
```

## Responsive Behavior

### Mobile (max-width: 767px)
- H1: 2.5rem (40px)
- H2: 1.75rem (28px)
- H3: 1.5rem (24px)
- H4: 1.25rem (20px)
- Body: 1rem (16px)

### Tablet (min-width: 768px)
- H1: 3.5rem (56px)
- H2: 2.5rem (40px)
- H3: 1.75rem (28px)

### Desktop (min-width: 1024px)
- H1: 4.5rem (72px)
- H2: 3.5rem (56px)
- H3: 2rem (32px)

## Button Typography

### Primary Buttons
```css
.btn-primary {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.2;
  letter-spacing: 0.02em;
  text-transform: lowercase;
}
```

### Secondary Buttons
```css
.btn-secondary {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.2;
  letter-spacing: 0.01em;
}
```

## Navigation Typography

### Nav Links
```css
.nav-link {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.2;
  text-transform: lowercase;
}
```

## Implementation Guidelines

### Color Usage
- **Primary text**: `#FFFFFF` (white) on dark backgrounds
- **Secondary text**: `#CCCCCC` (light gray) for less important content
- **Accent text**: `#9eff1f` (electric lime) for highlights and CTAs

### Best Practices
1. Use Space Grotesk for all headings (H1-H4) to maintain brand personality
2. Use Inter for all body text and UI elements for maximum readability
3. Maintain consistent letter-spacing on headlines (-0.01em to -0.02em)
4. Avoid text shadows or heavy effects - focus on weight and size hierarchy
5. Use the responsive classes for optimal mobile experience

### CSS Classes Available
- `.hero-text` - For hero sections
- `.section-title` - For section titles
- `.body-large` - For large body text
- `.body-regular` - For regular body text
- `.brand-text` - For brand-specific text
- `.quote-text` - For quotes and testimonials

## Performance Considerations
- Fonts are preloaded for critical rendering path optimization
- Font-display: swap is used for better loading experience
- Fallback fonts are included in all font stacks for graceful degradation

This typography system ensures TheTeenspreneur feels both authoritative and accessible - perfect for teenage entrepreneurs and their parents.