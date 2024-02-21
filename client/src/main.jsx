import "@brainhubeu/react-carousel/lib/style.css"
import "@mantine/carousel/styles.css"
import "@mantine/notifications/styles.css"
import "react-datepicker/dist/react-datepicker.css"
import "react-loading-skeleton/dist/skeleton.css"

import { MantineProvider } from "@mantine/core"
import "@mantine/core/styles.css"
import { Font } from "@react-pdf/renderer"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { Notifications } from "@mantine/notifications"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import { persistor, store } from "./store.js"
// Register font for react-pdf
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
      fontWeight: 700,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-800.ttf",
      fontWeight: 800,
    },
  ],
})

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <Notifications
        position="bottom-center"
        zIndex={1000}
        styles={{
          notification: { background: "#212121" },
        }}
        w="fit-content"
      />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </MantineProvider>
  </React.StrictMode>
)
