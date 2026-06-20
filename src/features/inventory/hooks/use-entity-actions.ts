
import { useReducer, useCallback } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";
import type { HateoasLink } from "@/types";

type ActionType = "activate" | "deactivate" | "delete";

interface ActionState {
  loading: boolean;
  actionType: ActionType | null;
  error: string | null;
}

type ActionEvent =
  | { type: "START"; actionType: ActionType }
  | { type: "SUCCESS" }
  | { type: "ERROR"; error: string };

function actionReducer(state: ActionState, event: ActionEvent): ActionState {
  switch (event.type) {
    case "START":
      return { loading: true, actionType: event.actionType, error: null };
    case "SUCCESS":
      return { loading: false, actionType: null, error: null };
    case "ERROR":
      return { loading: false, actionType: null, error: event.error };
  }
}

interface ActionMessages {
  success?: string;
  error?: string;
}

interface EntityActionsConfig {
  activate: UseMutationResult<unknown, Error, HateoasLink>;
  deactivate: UseMutationResult<unknown, Error, HateoasLink>;
  delete: UseMutationResult<unknown, Error, HateoasLink>;
  entityName: string;
}

export function useEntityActions(config: EntityActionsConfig) {
  const [state, dispatch] = useReducer(actionReducer, {
    loading: false,
    actionType: null,
    error: null,
  });

  const executeAction = useCallback(
    async (actionType: ActionType, mutation: UseMutationResult<unknown, Error, HateoasLink>, link: HateoasLink, messages: ActionMessages) => {
      dispatch({ type: "START", actionType });
      try {
        await mutation.mutateAsync(link);
        toast.success(messages.success, { position: "top-center" });
        dispatch({ type: "SUCCESS" });
      } catch {
        toast.error(messages.error, { position: "top-center" });
        dispatch({ type: "ERROR", error: messages.error?? "" });
      }
    },
    [config.entityName]
  );

  const handleActivate = useCallback(
    (link: HateoasLink, messages: ActionMessages) => executeAction("activate", config.activate, link, messages),
    [config.activate, executeAction]
  );

  const handleDeactivate = useCallback(
    (link: HateoasLink, messages: ActionMessages) => executeAction("deactivate", config.deactivate, link, messages),
    [config.deactivate, executeAction]
  );

  const handleDelete = useCallback(
    (link: HateoasLink, messages: ActionMessages) => executeAction("delete", config.delete, link, messages),
    [config.delete, executeAction]
  );

  return {
    state,
    handleActivate,
    handleDeactivate,
    handleDelete,
    isActionLoading: (actionType?: ActionType) =>
      state.loading && (!actionType || state.actionType === actionType),
  };
}
