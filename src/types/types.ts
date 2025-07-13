export interface Country {
  name: {
    common: string
    official: string
    nativeName: Record<string, {
      common: string
      official: string
    }>
  }
  flags: {
    png: string
    svg: string
    alt?: string
  }
  population: number
  region: string
  subregion?: string
  capital?: string[]
  borders?: string[]
  tld?: string[]
  currencies?: Record<string, {
    name: string
    symbol: string
  }>
  languages?: Record<string, string>
  cca3: string
  cca2: string
}

export interface CountryBorder {
  name: string
  code: string
}

export interface ApiError {
  message: string
  status?: number
}

export interface CountriesResponse {
  countries: Country[]
}

export interface CountryResponse {
  country: Country[]
}