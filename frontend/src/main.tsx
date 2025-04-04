import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.scss";

import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <Toaster />
    </div>
    <App />
  </StrictMode>
);
