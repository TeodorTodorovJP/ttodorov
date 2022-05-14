import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

// document.head.querySelector('meta[http-equiv="Content-Security-Policy"]').setAttribute("content", '');`

// const PORT = process.env.PORT || 'http://127.0.0.1:5000';

// let CSPcontent = `default-src 'self' ; script-src 'self' 'unsafe-inline'; connect-src 'self' ${PORT}; img-src 'self'; style-src 'self' 'unsafe-inline';base-uri 'self';form-action 'self'`


// const metaTag: HTMLElement | null = document.head.querySelector("meta[http-equiv='Content-Security-Policy']");

// if (metaTag instanceof HTMLMetaElement) {
//   metaTag.setAttribute("content", CSPcontent);
// }


// let CSPMeta = metaTags.filter( (meta: Object) => meta["httpEquiv"] === "Content-Security-Policy")

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
