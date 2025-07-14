import { create } from 'zustand';

type Regions = 'Africa' | 'Americas' | 'Asia' | 'Oceania' | 'Europe' | 'Antarctic';
type SortBy = 'population' | 'name' | 'area';

type State = {
  regionFilters: Regions[];
  setRegionFilters: (regions: Regions[]) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  unMemberFilter: boolean | null;
  setUnMemberFilter: (value: boolean | null) => void;
  independentFilter: boolean | null;
  setIndependentFilter: (value: boolean | null) => void;
  borderCountries: object[];
  setBorderCountries: (value: any) => void;
};

export const useCountryStore = create<State>()((set, _get) => ({
  regionFilters: [],
  setRegionFilters: (regionFilters) => set({ regionFilters }),
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  sortBy: 'population',
  setSortBy: (sortBy) => set({ sortBy }),
  unMemberFilter: null,
  setUnMemberFilter: (unMemberFilter) => set({ unMemberFilter }),
  independentFilter: null,
  setIndependentFilter: (independentFilter) => set({ independentFilter }),
  borderCountries: [],
  setBorderCountries: (borderCountries) => set({ borderCountries }),
}));
