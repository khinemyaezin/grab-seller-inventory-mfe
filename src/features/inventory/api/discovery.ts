import { resolveLink, type HateoasLink } from "@grab/seller-api";
import type { InventoryRoot } from "../types";
import { inventoryService } from "./inventory";

export async function fetchInventoryRoot(link: HateoasLink): Promise<InventoryRoot> {
  const response = await inventoryService.getRoot(link);
  return {
    self: resolveLink(response._links, "self"),
    pagedLocation: resolveLink(response._links, "paged-location"),
    location: resolveLink(response._links, "location"),
    createLocation: resolveLink(response._links, "create-location"),
  };
}
