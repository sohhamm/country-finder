import useSWR from 'swr';

const URL = 'https://restcountries.eu/rest/v2/all';

const getAllCountries = async () => {
  try {
    return await (await fetch(URL)).json();
  } catch (err) {
    throw new Error('error getting countries');
  }
};

export const useGetAllCountries = () => {
  const { data, error } = useSWR('countries', getAllCountries);
  return { countries: data, error };
};
