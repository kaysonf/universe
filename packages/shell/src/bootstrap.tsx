import React from "react";
import ReactDOM from "react-dom/client";
import Shell from "./Shell";

const bootstrap = () => {
  const app = document.createElement("div");
  app.setAttribute("id", "universe-shell");
  document.body.appendChild(app);

  ReactDOM.createRoot(app).render(
    <React.StrictMode>
      <Shell />
    </React.StrictMode>
  );
};

export default bootstrap;
