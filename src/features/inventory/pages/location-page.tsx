
import { Link, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { ButtonGroup } from "@grab/seller-ui/components/button-group";
import { Button } from "@grab/seller-ui/components/button";
import { Header } from "@grab/seller-ui/layout/header";
import { routes } from "@grab/seller-contracts";
import { useInventoryRoot } from "@/features/inventory/hooks/use-inventory-root";
import LocationEditForm from "@/features/inventory/components/location/location-edit-form";

type EditLocationPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditLocationPage() {
  const { locationId: id } = useParams<{ locationId: string }>();
  const { data: inventoryRoot } = useInventoryRoot();

  return (
    <div className="container mx-auto max-w-2xl">
      <Header
        title={`Edit Location`}
        description="Update location details and manage zones."
      >
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="secondary" size="icon" type="button">
              <Link to={routes.locations} className="flex gap-2 items-center">
                <ArrowLeftIcon />
              </Link>
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Header>
      {inventoryRoot?.location && id && (
        <LocationEditForm locationId={id} link={inventoryRoot.location} />
      )}
    </div>
  );
}
