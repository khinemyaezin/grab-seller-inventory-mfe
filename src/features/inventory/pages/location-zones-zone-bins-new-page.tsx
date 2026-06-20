
import { Button } from "@grab/seller-ui/components/index";
import { Header } from "@grab/seller-ui/layout/header";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { routes } from "@grab/seller-contracts";
import { ButtonGroup } from "@grab/seller-ui/components/button-group";
import { useInventoryRoot } from "@/features/inventory/hooks/use-inventory-root";
import { useLocation } from "@/features/inventory/hooks/use-locations";
import { useZone } from "@/features/inventory/hooks/use-zones";
import { resolveLink } from "@grab/seller-api";
import BinNewForm from "@/features/inventory/components/bin/bin-new-form";
import type { HateoasLink } from "@grab/seller-api";

type NewBinPageProps = {
  params: Promise<{ id: string; zoneId: string }>;
};

export default function NewBinPage() {
  const { locationId, zoneId } = useParams<{ locationId: string; zoneId: string }>();
  if (!locationId || !zoneId) throw new Error("Missing inventory route parameters");
  const id = locationId;
  const { data: inventory } = useInventoryRoot();
  const { data: location } = useLocation(inventory?.location, id);
  const zoneLink = resolveLink(location?._links, "zone") ?? ({} as HateoasLink);
  const { data: zone } = useZone(zoneLink, zoneId);

  const createBinLink = resolveLink(zone?._links, "create-bin");

  return (
    <div className="container mx-auto max-w-2xl">
      <Header
        title="New Bin"
        description="Create a new bin in this zone."
      >
        <ButtonGroup>
          <Button variant="secondary" size="icon" type="button">
            <Link to={routes.admin.zones(id)} className="flex gap-2 items-center">
              <ArrowLeftIcon />
            </Link>
          </Button>
        </ButtonGroup>
      </Header>
      {createBinLink && (
        <BinNewForm link={createBinLink} locationId={id} zoneId={zoneId} />
      )}
    </div>
  );
}
