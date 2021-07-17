import create from 'zustand';

type State = {
  countryNames: string[];
  setCountryNames: (names: string[]) => void;
};

export const useCountryStore = create<State>((set, _get) => ({
  countryNames: [],
  setCountryNames: (countryNames) => set({ countryNames }),
}));
