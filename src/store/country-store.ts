import create from 'zustand';

type Regions = 'Africa' | 'Americas' | 'Asia' | 'Oceania' | 'Europe';

type State = {
  countryNames: string[];
  setCountryNames: (names: string[]) => void;
  regionFilter: Regions | null;
  setRegionFilter: (region: Regions | null) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
};

export const useCountryStore = create<State>((set, _get) => ({
  countryNames: [],
  setCountryNames: (countryNames) => set({ countryNames }),
  regionFilter: null,
  setRegionFilter: (regionFilter) => set({ regionFilter }),
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}));
