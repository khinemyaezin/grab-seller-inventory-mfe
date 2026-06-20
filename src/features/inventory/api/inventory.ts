import { api } from "@grab/seller-api"
import { HateoasLink } from "@grab/seller-api"
import { InventoryRootResponse } from "@/features/inventory/types/inventory.response"

export const inventoryService = {
    getRoot: (link: HateoasLink, headers?: Record<string, string>): Promise<InventoryRootResponse>  =>
        api.followLink<InventoryRootResponse>(link, "GET", undefined, undefined, headers)
}
