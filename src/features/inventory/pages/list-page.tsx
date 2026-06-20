
import { Header } from "@grab/seller-ui/layout/header";
import { useInventoryRoot } from "@/features/inventory/hooks/use-inventory-root";
import LocationsView from "@/features/inventory/components/location/locations-view";

export default function LocationsPage() {
  const { data: inventoryRoot } = useInventoryRoot();

  return (
    <div className="container mx-auto max-w-5xl">
      <Header
        title="Location"
        description="Manage your warehouses, stores, and distribution centers.">
      </Header>

      {inventoryRoot?.pagedLocation && (
        <LocationsView
          link={inventoryRoot.pagedLocation}
          canCreate={!!inventoryRoot?.createLocation}
        />
      )}
    </div>
  );
}
