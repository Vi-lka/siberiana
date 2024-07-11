import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

import type { CountriesForTable, DistrictsForTable, LocationsForTable, RegionsForTable, SettlementsForTable } from "@siberiana/schemas";

//.........................LOCATION.........................//
export function useCreateLocation(access_token?: string) {
    const mutationString = `
          mutation CreateLocation($input: CreateLocationInput!) {
              createLocation(input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: LocationsForTable) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            input: {
              displayName: value.displayName,
              description: value.description,
              externalLink: value.externalLink,
              countryID: value.country?.id,
              regionID: value.region?.id,
              districtID: value.district?.id,
              settlementID: value.settlement?.id
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}
  
export function useDeleteLocation(access_token?: string) {
    const mutationString = `
          mutation DeleteLocation($deleteLocationId: ID!) {
              deleteLocation(id: $deleteLocationId)
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: string) =>
        request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          { deleteLocationId: value },
          requestHeaders,
        ),
    });
    return mutation;
}
  
export function useUpdateLocation(access_token?: string) {
    const mutationString = `
          mutation UpdateLocation($updateLocationId: ID!, $input: UpdateLocationInput!) {
              updateLocation(id: $updateLocationId, input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: ({
        id,
        newValue,
      }: {
        id: string;
        newValue: LocationsForTable;
      }) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            updateLocationId: id,
            input: {
              displayName: newValue.displayName,
              description: newValue.description,
              externalLink: newValue.externalLink,
              countryID: newValue.country?.id,
              regionID: newValue.region?.id,
              districtID: newValue.district?.id,
              settlementID: newValue.settlement?.id
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}

//.........................COUNTRY.........................//
export function useCreateCountry(access_token?: string) {
    const mutationString = `
          mutation CreateCountry($input: CreateCountryInput!) {
              createCountry(input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: CountriesForTable) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            input: {
              displayName: value.displayName,
              description: value.description,
              externalLink: value.externalLink,
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}
  
export function useDeleteCountry(access_token?: string) {
    const mutationString = `
          mutation DeleteCountry($deleteCountryId: ID!) {
              deleteCountry(id: $deleteCountryId)
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: string) =>
        request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          { deleteCountryId: value },
          requestHeaders,
        ),
    });
    return mutation;
}
  
export function useUpdateCountry(access_token?: string) {
    const mutationString = `
          mutation UpdateCountry($updateCountryId: ID!, $input: UpdateCountryInput!) {
              updateCountry(id: $updateCountryId, input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: ({
        id,
        newValue,
      }: {
        id: string;
        newValue: CountriesForTable;
      }) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            updateCountryId: id,
            input: {
              displayName: newValue.displayName,
              description: newValue.description,
              externalLink: newValue.externalLink
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}

//.........................REGION.........................//
export function useCreateRegion(access_token?: string) {
    const mutationString = `
          mutation CreateRegion($input: CreateRegionInput!) {
              createRegion(input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: RegionsForTable) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            input: {
              displayName: value.displayName,
              description: value.description,
              externalLink: value.externalLink,
              countryId: value.country?.id,
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}
  
export function useDeleteRegion(access_token?: string) {
    const mutationString = `
          mutation DeleteRegion($deleteRegionId: ID!) {
              deleteRegion(id: $deleteRegionId)
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: string) =>
        request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          { deleteRegionId: value },
          requestHeaders,
        ),
    });
    return mutation;
}
  
export function useUpdateRegion(access_token?: string) {
    const mutationString = `
          mutation UpdateRegion($updateRegionId: ID!, $input: UpdateRegionInput!) {
              updateRegion(id: $updateRegionId, input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: ({
        id,
        newValue,
      }: {
        id: string;
        newValue: RegionsForTable;
      }) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            updateRegionId: id,
            input: {
              displayName: newValue.displayName,
              description: newValue.description,
              externalLink: newValue.externalLink,
              countryId: newValue.country?.id,
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}

//.........................DISTRICT.........................//
export function useCreateDistrict(access_token?: string) {
    const mutationString = `
          mutation CreateDistrict($input: CreateDistrictInput!) {
              createDistrict(input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: DistrictsForTable) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            input: {
              displayName: value.displayName,
              description: value.description,
              externalLink: value.externalLink,
              regionId: value.region?.id,
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}
  
export function useDeleteDistrict(access_token?: string) {
    const mutationString = `
          mutation DeleteDistrict($deleteDistrictId: ID!) {
              deleteDistrict(id: $deleteDistrictId)
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: string) =>
        request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          { deleteDistrictId: value },
          requestHeaders,
        ),
    });
    return mutation;
}
  
export function useUpdateDistrict(access_token?: string) {
    const mutationString = `
          mutation UpdateDistrict($updateDistrictId: ID!, $input: UpdateDistrictInput!) {
              updateDistrict(id: $updateDistrictId, input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: ({
        id,
        newValue,
      }: {
        id: string;
        newValue: DistrictsForTable;
      }) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            updateDistrictId: id,
            input: {
              displayName: newValue.displayName,
              description: newValue.description,
              externalLink: newValue.externalLink,
              regionId: newValue.region?.id,
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}

//.........................SETTLEMENT.........................//
export function useCreateSettlement(access_token?: string) {
    const mutationString = `
          mutation CreateSettlement($input: CreateSettlementInput!) {
              createSettlement(input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: SettlementsForTable) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            input: {
              displayName: value.displayName,
              description: value.description,
              externalLink: value.externalLink,
              regionId: value.region?.id,
              districtId: value.district?.id,
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}
  
export function useDeleteSettlement(access_token?: string) {
    const mutationString = `
          mutation DeleteSettlement($deleteSettlementId: ID!) {
              deleteSettlement(id: $deleteSettlementId)
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: (value: string) =>
        request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          { deleteSettlementId: value },
          requestHeaders,
        ),
    });
    return mutation;
}
  
export function useUpdateSettlement(access_token?: string) {
    const mutationString = `
          mutation UpdateSettlement($updateSettlementId: ID!, $input: UpdateSettlementInput!) {
              updateSettlement(id: $updateSettlementId, input: $input) {
                  id
                  displayName
              }
          }
      `;
    const requestHeaders = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };
    const mutation = useMutation({
      mutationFn: ({
        id,
        newValue,
      }: {
        id: string;
        newValue: SettlementsForTable;
      }) => {
        return request(
          `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
          mutationString,
          {
            updateSettlementId: id,
            input: {
              displayName: newValue.displayName,
              description: newValue.description,
              externalLink: newValue.externalLink,
              regionId: newValue.region?.id,
              districtId: newValue.district?.id,
            },
          },
          requestHeaders,
        );
      },
    });
    return mutation;
}