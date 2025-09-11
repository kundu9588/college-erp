This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

<<<<<<< HEAD
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
=======
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:
 
```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
>>>>>>> 99cb3d3f3569a4af29b2ed58535af6b95d1b832c
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

project-root/
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── auth/                 # Authentication-related components
│   │   │   ├── SignInLayer.tsx   # Sign-in component
│   │   ├── common/               # Shared components (e.g., buttons, modals)
│   │   ├── layout/               # Layout components (e.g., sidebar, header)
│   ├── features/                 # Redux Toolkit slices for each module
│   │   ├── auth/                 # Authentication module
│   │   │   ├── actions.ts
│   │   │   ├── apiClient.ts
│   │   │   ├── clients.ts
│   │   │   ├── model.ts         # Contains User interface
│   │   │   ├── reducer.ts
│   │   │   ├── selectors.ts
│   │   │   ├── services.ts
│   │   ├── inventory/            # Inventory module
│   │   │   ├── actions.ts
│   │   │   ├── model.ts         # Contains InventoryItem interface
│   │   │   ├── reducer.ts
│   │   │   ├── selectors.ts
│   │   │   ├── services.ts
│   │   ├── employees/            # Employee module
│   │   ├── finance/             # Finance module
│   ├── pages/                    # Next.js pages
│   │   ├── _app.tsx             # Custom App for Redux setup
│   │   ├── _document.tsx        # Custom Document
│   │   ├── index.tsx            # Home page
│   │   ├── login.tsx            # Login page
│   │   ├── dashboard.tsx        # Dashboard page
│   │   ├── inventory/           # Inventory-related pages
│   │   ├── employees/           # Employee-related pages
│   │   ├── finance/             # Finance-related pages
│   ├── store/                    # Redux store configuration
│   │   ├── rootReducer.ts
│   │   ├── store.ts
│   │   ├── storeTypes.ts        # Redux store types (RootState, AppDispatch)
│   ├── styles/                   # CSS/SCSS files
│   ├── utils/                    # Utility functions (e.g., API helpers)
│   ├── public/                   # Static assets (images, etc.)
├── .env.local                    # Environment variables
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json