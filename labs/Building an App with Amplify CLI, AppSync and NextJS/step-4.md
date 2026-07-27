# Step 4 — Setting up Styling with TailwindCSS (4 min)

## Objective

- Confirm Tailwind CSS — already scaffolded by `create-next-app`'s recommended defaults in Step 2 — is working, and make a small customization.

## Steps

1. Since Step 2's recommended defaults already included Tailwind CSS, there's nothing left to install. Confirm it's already wired up:
   - `app/globals.css` starts with `@import "tailwindcss";`
   - `postcss.config.mjs` includes the `@tailwindcss/postcss` plugin.
2. In `app/page.tsx`, add a Tailwind utility class to the heading to confirm styles are applied:

```tsx
<h1 className="text-3xl font-bold underline">Welcome</h1>
```

3. Try adding a custom color in `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand: oklch(0.6 0.2 280);
}
```

4. Use it in `app/page.tsx` with `className="text-brand"` and confirm the custom color renders.

![Welcome](image-5.png)

## What to check

- The heading in `app/page.tsx` picks up the Tailwind classes (e.g. renders bold and underlined) in the browser.
- The custom `text-brand` color from your `@theme` block renders correctly.
- No PostCSS/Tailwind errors in the terminal running `npm run dev`.

