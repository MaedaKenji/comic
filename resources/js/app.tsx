import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

import React from "react";
import Home from "./pages/home";

const container = document.getElementById("app")!;

createRoot(container).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

// This will set light / dark mode on load...
initializeTheme();

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => (title ? `${title} - ${appName}` : appName),
//     resolve: (name) =>
//         resolvePageComponent(
//             `./pages/${name}.tsx`,
//             import.meta.glob('./pages/**/*.tsx'),
//         ),
//     setup({ el, App, props }) {
//         const root = createRoot(el);

//         root.render(
//             <StrictMode>
//                 <App {...props} />
//             </StrictMode>,
//         );
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });


