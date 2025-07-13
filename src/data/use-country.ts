import useSWR from 'swr'

const getCountryByName = async (url: string) => {
  try {
    return await (await fetch(url)).json()
  } catch (err) {
    throw new Error('error getting countries')
  }
}

export const useCountry = (name: string) => {
  const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`
  const {data, error} = useSWR(url, getCountryByName)

  return {country: data, error}
}
