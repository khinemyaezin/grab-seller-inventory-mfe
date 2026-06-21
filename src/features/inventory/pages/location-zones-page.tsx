
import { Link, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Header } from "@grab/seller-ui/layout/header";
import { Button } from "@grab/seller-ui/components/index";
import { routes } from "@grab/seller-contracts";
import { useInventoryRoot } from "@/features/inventory/hooks/use-inventory-root";
import { useLocation } from "@/features/inventory/hooks/use-locations";
import { resolveLink } from "@grab/seller-api";
import { LocationSummary } from "@/features/inventory/components/location/location-summary";
import ZonesView from "@/features/inventory/components/zone/zones-view";

type ZonesPageProps = {
  params: Promise<{ id: string }>;
};

export default function ZonesPage() {
  const { locationId: id } = useParams<{ locationId: string }>();
  const { data: inventoryRoot } = useInventoryRoot();
  const { data: location } = useLocation((inventoryRoot?.location)!, id);

  const pagedZone = resolveLink(location?._links, "paged-zone");
  const createZone = resolveLink(location?._links, "create-zone");

  return (
    <div className="container mx-auto max-w-5xl space-y-6">
      <Header
        title="Zones"
        description="Manage zones and bins for this location."
      >
        <Button variant="secondary">
          <Link to={routes.locations} className="flex gap-2 items-center">
            <ArrowLeftIcon />
            <span>Back to Locations</span>
          </Link>
        </Button>
      </Header>

      {location && (
        <LocationSummary location={location} />
      )}

      {pagedZone && id && (
        <ZonesView locationId={id} link={pagedZone} canCreate={!!createZone} />
      )}
    </div>
  );
}
