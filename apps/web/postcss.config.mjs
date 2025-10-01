/**
 * Tailwind CSS v4 PostCSS config for Next.js
 * Ensures Tailwind classes in globals.css are processed.
 */

export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
