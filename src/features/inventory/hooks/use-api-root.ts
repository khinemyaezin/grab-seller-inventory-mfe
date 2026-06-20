
import { useQuery } from "@tanstack/react-query";
import { fetchApiRoot, type ApiRoot } from "@grab/seller-api";

export function useApiRoot() {
  return useQuery<ApiRoot>({
    queryKey: ["api-root"],
    queryFn: fetchApiRoot,
    staleTime: Infinity,
  });
}
