/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#111827',
        'bg-secondary': '#1F2937',
        'bg-tertiary': '#374151',
        'text-primary': '#F9FAFB',
        'text-secondary': '#D1D5DB',
        'accent-primary': '#3B82F6',
        'accent-secondary': '#10B981',
        'accent-tertiary': '#F59E0B',
        'border-color': '#4B5563',
        'shadow-color': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}