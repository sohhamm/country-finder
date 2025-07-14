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
  area: number
  region: string
  subregion?: string
  capital?: string[]
  tld?: string[]
  cca2?: string
  ccn3?: string
  cioc?: string
  independent?: boolean
  status?: string
  unMember?: boolean
  currencies?: Record<string, {
    symbol: string
    name: string
  }>
  idd?: {
    root: string
    suffixes: string[]
  }
  altSpellings?: string[]
  languages?: Record<string, string>
  latlng?: number[]
  landlocked?: boolean
  borders?: string[]
  demonyms?: Record<string, {
    f: string
    m: string
  }>
  cca3?: string
  translations?: Record<string, {
    official: string
    common: string
  }>
  flag?: string
  maps?: {
    googleMaps?: string
    openStreetMaps?: string
  }
  gini?: Record<string, number>
  fifa?: string
  car?: {
    signs: string[]
    side: string
  }
  timezones?: string[]
  continents?: string[]
  coatOfArms?: {
    png?: string
    svg?: string
  }
  startOfWeek?: string
  capitalInfo?: {
    latlng: number[]
  }
  postalCode?: {
    format: string
    regex: string
  }
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

export interface FilterOptions {
  search?: string
  region?: string
  subregion?: string
  populationRange?: {
    min?: number
    max?: number
  }
  areaRange?: {
    min?: number
    max?: number
  }
  language?: string
  currency?: string
  landlocked?: boolean
  unMember?: boolean
  independent?: boolean
  sortBy?: 'name' | 'population' | 'area' | 'region'
  sortOrder?: 'asc' | 'desc'
}

export interface PopulationRange {
  label: string
  min: number
  max: number
}

export interface AreaRange {
  label: string
  min: number
  max: number
}