---
name: page-speed
description: This skill defines conventions for performance optimization in the next-monorepo-starter frontend.
---

## Bundle Size

- Monitor bundle size on every PR
- Maximum JavaScript bundle per route: 200KB gzipped
- Use dynamic imports for heavy components
- Analyze bundles with `pnpm analyze`

```typescript
// Dynamic import for heavy components
const HeavyChart = dynamic(() => import('./heavy-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
```

## Lazy Loading

- Lazy load below-the-fold content
- Use Intersection Observer for visibility detection
- Defer non-critical JavaScript

```typescript
// Lazy load component when visible
const LazySection = () => {
  const ref = useRef(null);
  const isVisible = useIntersectionObserver(ref);

  return (
    <div ref={ref}>
      {isVisible ? <HeavyContent /> : <Placeholder />}
    </div>
  );
};
```

## Image Optimization

- Use Next.js `<Image>` component for all images
- Always specify width and height to prevent layout shift
- Use appropriate formats: WebP for photos, SVG for icons
- Implement responsive images with `sizes` prop

```typescript
<Image
  src={item.image}
  alt={item.title}
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
  priority={isAboveFold}
/>
```

## Video Optimization

- Use lazy loading for videos
- Provide poster images for video elements
- Use appropriate codecs (H.264 for compatibility, VP9/AV1 for modern browsers)
- Consider using video hosting services for large files

## Lighthouse Guardrails

Minimum scores for production deployment:

| Metric         | Minimum Score |
| -------------- | ------------- |
| Performance    | 90            |
| Accessibility  | 100           |
| Best Practices | 100           |
| SEO            | 100           |

## Core Web Vitals

Target metrics:

| Metric                          | Target  |
| ------------------------------- | ------- |
| LCP (Largest Contentful Paint)  | < 2.5s  |
| FID (First Input Delay)         | < 100ms |
| CLS (Cumulative Layout Shift)   | < 0.1   |
| INP (Interaction to Next Paint) | < 200ms |

## Font Loading

- Use `next/font` for font optimization
- Subset fonts to required characters
- Use `font-display: swap` for custom fonts

## Third-Party Scripts

- Load third-party scripts with `next/script`
- Use `strategy="lazyOnload"` for non-critical scripts
- Audit third-party impact regularly

```typescript
<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload"
/>
```

## Per-App Dev Servers

| App    | Port |
| ------ | ---- |
| web    | 3000 |
| admin  | 3001 |
| studio | 3002 |

Run `pnpm --filter web dev`, `pnpm --filter admin dev`, or `pnpm --filter studio dev` to start individual apps.
