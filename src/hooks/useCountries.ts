import {useQuery} from '@tanstack/react-query'
import {countriesApi, countriesKeys} from '../api/countries'
import type {Country, ApiError} from '../types/types'

export function useCountries() {
  return useQuery<Country[], ApiError>({
    queryKey: countriesKeys.lists(),
    queryFn: () => countriesApi.getAllCountries(),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - countries data rarely changes
    refetchOnWindowFocus: false,
  })
}

export function useCountry(name: string | undefined) {
  return useQuery<Country[], ApiError>({
    queryKey: countriesKeys.detail(name || ''),
    queryFn: () => countriesApi.getCountryByName(name!),
    enabled: !!name,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}

export function useCountriesByCodes(codes: string[]) {
  return useQuery<Country[], ApiError>({
    queryKey: countriesKeys.border(codes),
    queryFn: () => countriesApi.getCountriesByCodes(codes),
    enabled: codes.length > 0,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
  })
}
