import type {Country, ApiError} from '../types/types'
import {API_BASE_URL} from '../utils'
import {unslugify} from '../utils/slugify'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    try {
      const response = await fetch(url)

      if (!response.ok) {
        const error: ApiError = {
          message: `HTTP error! status: ${response.status}`,
          status: response.status,
        }
        throw error
      }

      return await response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          status: 0,
        } as ApiError
      }
      throw {
        message: 'An unknown error occurred',
        status: 0,
      } as ApiError
    }
  }

  async getAllCountries(): Promise<Country[]> {
    const fields = 'name,flags,population,area,region,subregion,capital'
    return this.request<Country[]>(`/all?fields=${fields}`)
  }

  async getCountryByName(nameOrSlug: string): Promise<Country[]> {
    const searchName = unslugify(nameOrSlug)
    return this.request<Country[]>(`/name/${encodeURIComponent(searchName)}?fullText=true`)
  }

  async getCountriesByCodes(codes: string[]): Promise<Country[]> {
    if (codes.length === 0) return []
    const codesParam = codes.join(',')
    return this.request<Country[]>(`/alpha?codes=${codesParam}&fields=name,cca2,cca3`)
  }
}

export const countriesApi = new ApiClient(API_BASE_URL)

export const countriesKeys = {
  all: ['countries'] as const,
  lists: () => [...countriesKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...countriesKeys.lists(), {filters}] as const,
  details: () => [...countriesKeys.all, 'detail'] as const,
  detail: (name: string) => [...countriesKeys.details(), name] as const,
  borders: () => [...countriesKeys.all, 'borders'] as const,
  border: (codes: string[]) => [...countriesKeys.borders(), codes] as const,
} as const
