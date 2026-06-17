import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Font tự host (Fontsource) — mỗi file weight đã kèm subset vietnamese
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/500-italic.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/be-vietnam-pro/300.css";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "./index.css";

import { weddingConfig } from "@/lib/wedding-config";
import App from "./App";

const { groom, bride } = weddingConfig.couple;
document.title = `${bride.name} ♥ ${groom.name} | Thiệp Cưới`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
