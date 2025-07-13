import { create } from 'zustand';

type Regions = 'Africa' | 'Americas' | 'Asia' | 'Oceania' | 'Europe';

type State = {
  regionFilter: Regions | null;
  setRegionFilter: (region: Regions | null) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  borderCountries: object[];
  setBorderCountries: (value: any) => void;
};

export const useCountryStore = create<State>()((set, _get) => ({
  regionFilter: null,
  setRegionFilter: (regionFilter) => set({ regionFilter }),
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  borderCountries: [],
  setBorderCountries: (borderCountries) => set({ borderCountries }),
}));
