import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider, Toaster } from "@grab/seller-ui";
import InventoryRoutes from "./InventoryRoutes";
import { configureApi } from "@grab/seller-api";

configureApi({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})

export default function StandaloneApp() {
  const [client] = useState(() => new QueryClient());
  return (
    <ThemeProvider><QueryClientProvider client={client}>
      <BrowserRouter>
        <main className="min-h-screen bg-background p-8">
          <Toaster />
          <Routes>
            <Route path="/dashboard/locations/*" element={<InventoryRoutes />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
    </ThemeProvider>
  );
}
