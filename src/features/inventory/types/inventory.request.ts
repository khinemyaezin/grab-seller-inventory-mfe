import type { LocationType, ZoneType } from "./inventory.model";
import type { ZoneResponse } from "./inventory.response";

export interface CreateLocationRequest {
  code: string;
  name: string;
  type: LocationType;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface UpdateLocationRequest {
  code?: string;
  name?: string;
  type?: LocationType;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

export interface CreateZoneRequest {
  code: string;
  name: string;
  type: ZoneType;
  active?: boolean;
}

export interface UpdateZoneRequest {
  code?: string;
  name?: string;
  type?: ZoneType;
  active?: boolean;
}

export interface CreateBinRequest {
  zoneId: string;
  code: string;
  name?: string;
  maxCapacity?: number;
}

export interface UpdateBinRequest {
  code?: string;
  name?: string;
  maxCapacity?: number;
  active?: boolean;
}

export interface ActivateZoneResponse extends ZoneResponse{

}


export interface DeactivateZoneResponse extends ZoneResponse{

}