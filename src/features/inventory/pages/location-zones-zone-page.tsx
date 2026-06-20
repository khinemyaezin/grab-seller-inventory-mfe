
import ZoneEditForm from "@/features/inventory/components/zone/zone-edit-form";
import { Header } from "@grab/seller-ui/layout/header";
import { Button } from "@grab/seller-ui/components/index";
import { ButtonGroup } from "@grab/seller-ui/components/button-group";
import { routes } from "@grab/seller-contracts";
import { useInventoryRoot } from "@/features/inventory/hooks/use-inventory-root";
import { useLocation } from "@/features/inventory/hooks/use-locations";
import { resolveLink } from "@grab/seller-api";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router";


export type EditZonePageProps = {
    params: Promise<{ id: string, zoneId: string }>;
}

export default function EditZonePage() {
    const { locationId, zoneId } = useParams<{ locationId: string; zoneId: string }>();
    if (!locationId || !zoneId) throw new Error("Missing inventory route parameters");
    const id = locationId;
    const { data: inventory } = useInventoryRoot();
    const { data: location } = useLocation(inventory?.location, id);
    const zoneLink = resolveLink(location?._links, "zone");

    return (
        <div className="container mx-auto max-w-2xl">
            <Header
                title={`Edit Zone`}
                description="Update zone."
            >
                <ButtonGroup>
                    <Button variant="secondary" size="icon" type="button">
                        <Link to={routes.admin.zones(id)} className="flex gap-2 items-center">
                            <ArrowLeftIcon />
                        </Link>
                    </Button>
                </ButtonGroup>
            </Header>
            {zoneLink && (
                <ZoneEditForm
                    link={zoneLink} id={zoneId}
                />
            )}
        </div>
    )
}
