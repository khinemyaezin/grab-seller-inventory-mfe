
import { HateoasLink } from "@/types"
import { ZoneTable } from "./zone-table"
import { Link } from "react-router"
import { routes } from "@grab/seller-contracts"
import { Button } from "@grab/seller-ui/components/index"
import { ButtonGroup } from "@grab/seller-ui/components/button-group"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@grab/seller-ui/components/card"

export type ZonesViewProps = {
    locationId: string,
    link: HateoasLink // Zone list link,
    canCreate: boolean
}

export default function ZonesView({ locationId, link, canCreate }: ZonesViewProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>List of zones</CardTitle>
                <CardAction>
                    <ButtonGroup>
                        {canCreate && (
                            <Button type="button">
                                <Link to={routes.admin.newZone(locationId)}>Add Zone</Link>
                            </Button>
                        )}
                    </ButtonGroup>
                </CardAction>
            </CardHeader>
            <CardContent>
                {link && (
                    <ZoneTable locationId={locationId} link={link}
                    ></ZoneTable>
                )}
            </CardContent>
        </Card>
    )
}
