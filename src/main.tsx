import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { z } from "zod/v4";
import { fr } from "zod/v4/locales";
import "./i18n/i18n";
import "./index.css";
import App from "./App.tsx";

z.config(fr());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
