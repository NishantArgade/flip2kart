import "@brainhubeu/react-carousel/lib/style.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider>
    <App />
  </MantineProvider>
);
