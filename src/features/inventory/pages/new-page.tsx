
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { ButtonGroup } from "@grab/seller-ui/components/button-group";
import { Button } from "@grab/seller-ui/components/button";
import { Header } from "@grab/seller-ui/layout/header";
import { routes } from "@grab/seller-contracts";
import LocationNewForm from "@/features/inventory/components/location/location-new-form";
import { useInventoryRoot } from "@/features/inventory/hooks/use-inventory-root";

export default function NewLocationPage() {
  const { data: inventoryRoot } = useInventoryRoot();
  return (
    <div className="container mx-auto max-w-xl">
      <Header
        title="Add Location"
        description="Create a new warehouse, store, or distribution center."
      >
        <ButtonGroup>
          <Button type="button" variant="secondary">
            <Link to={routes.locations} className="flex gap-2 items-center">
              <ArrowLeftIcon />
              <span>Back to Locations</span>
            </Link>
          </Button>

        </ButtonGroup>
      </Header>
      {inventoryRoot?.createLocation && (
        <LocationNewForm link={inventoryRoot.createLocation} />
      )}
    </div>
  );
}
