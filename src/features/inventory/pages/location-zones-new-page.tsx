
import { Button } from "@grab/seller-ui/components/index";

import { Header } from "@grab/seller-ui/layout/header";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { routes } from "@grab/seller-contracts";
import { ButtonGroup } from "@grab/seller-ui/components/button-group";
import { useInventoryRoot } from "@/features/inventory/hooks/use-inventory-root";
import { useLocation } from "@/features/inventory/hooks/use-locations";
import ZoneNewForm from "@/features/inventory/components/zone/zone-new-form";
import { resolveLink } from "@grab/seller-api";

type NewZonePageProps = {
    params: Promise<{ id: string }>;
};

export default function NewZonePage() {
    const { locationId } = useParams<{ locationId: string }>();
    if (!locationId) throw new Error("Missing locationId route parameter");
    const id = locationId;
    const { data: inventory } = useInventoryRoot();
    const { data: location } = useLocation(inventory?.location, id);

    const createZoneLink = resolveLink(location?._links, "create-zone");

    return (
        <div className="container mx-auto max-w-2xl">
            <Header
                title={`New Zone`}
                description="Create zone."
            >
                <ButtonGroup>
                    <ButtonGroup>
                        <Button variant="secondary" size="icon" type="button">
                            <Link to={routes.zones(id)} className="flex gap-2 items-center">
                                <ArrowLeftIcon />
                            </Link>
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Header>
            {createZoneLink && (
                <ZoneNewForm link={createZoneLink} locationId={id} />
            )}
        </div>
    )
}
