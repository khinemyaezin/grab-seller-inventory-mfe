
import { useQuery } from "@tanstack/react-query";
import { useApiRoot } from "./use-api-root";
import { fetchInventoryRoot } from "../api/discovery";
import type { InventoryRoot } from "@/features/inventory/types";

export function useInventoryRoot() {
  const { data: apiRoot } = useApiRoot();
  return useQuery<InventoryRoot>({
    queryKey: ["inventory-root", apiRoot?.inventory?.href],
    queryFn: () => fetchInventoryRoot(apiRoot!.inventory!),
    enabled: !!apiRoot?.inventory,
    staleTime: Infinity,
  });
}
