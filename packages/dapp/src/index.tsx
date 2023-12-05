// import '@transferto/shared/src/fonts/gt-america.css';
import '@transferto/shared/src/fonts/inter.css';
import '@transferto/shared/src/utils/structuredClone';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { default as App } from './App';
import { initSentry } from './config/initSentry';
import { reportWebVitals } from './reportWebVitals';

initSentry();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (import.meta.env.DEV) {
  reportWebVitals(console.log);
}
