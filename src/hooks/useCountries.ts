import { useQuery } from '@tanstack/react-query'
import { countriesApi, countriesKeys } from '../api/countries'
import type { Country, ApiError } from '../types/types'

export function useCountries() {
  return useQuery<Country[], ApiError>({
    queryKey: countriesKeys.lists(),
    queryFn: () => countriesApi.getAllCountries(),
    staleTime: 10 * 60 * 1000, // 10 minutes - countries data doesn't change often
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  })
}

export function useCountry(name: string | undefined) {
  return useQuery<Country[], ApiError>({
    queryKey: countriesKeys.detail(name || ''),
    queryFn: () => countriesApi.getCountryByName(name!),
    enabled: !!name,
    staleTime: 15 * 60 * 1000, // 15 minutes - country details change even less
    refetchOnWindowFocus: false,
  })
}

export function useCountriesByCodes(codes: string[]) {
  return useQuery<Country[], ApiError>({
    queryKey: countriesKeys.border(codes),
    queryFn: () => countriesApi.getCountriesByCodes(codes),
    enabled: codes.length > 0,
    staleTime: 20 * 60 * 1000, // 20 minutes - border countries are very stable
    refetchOnWindowFocus: false,
  })
}