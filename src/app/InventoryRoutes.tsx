import { Route, Routes } from "react-router";
import { configureApi } from "@grab/seller-api";
import LocationsPage from "@/features/inventory/pages/list-page";
import NewLocationPage from "@/features/inventory/pages/new-page";
import EditLocationPage from "@/features/inventory/pages/location-page";
import ZonesPage from "@/features/inventory/pages/location-zones-page";
import NewZonePage from "@/features/inventory/pages/location-zones-new-page";
import EditZonePage from "@/features/inventory/pages/location-zones-zone-page";
import NewBinPage from "@/features/inventory/pages/location-zones-zone-bins-new-page";
import EditBinPage from "@/features/inventory/pages/location-zones-zone-bins-bin-page";

configureApi({ baseUrl: "/api", getAccessToken: () => localStorage.getItem("seller-access-token") });

export default function InventoryRoutes() {
  return (
    <Routes>
      <Route index element={<LocationsPage />} />
      <Route path="new" element={<NewLocationPage />} />
      <Route path=":locationId" element={<EditLocationPage />} />
      <Route path=":locationId/zones" element={<ZonesPage />} />
      <Route path=":locationId/zones/new" element={<NewZonePage />} />
      <Route path=":locationId/zones/:zoneId" element={<EditZonePage />} />
      <Route path=":locationId/zones/:zoneId/bins/new" element={<NewBinPage />} />
      <Route path=":locationId/zones/:zoneId/bins/:binId" element={<EditBinPage />} />
    </Routes>
  );
}
