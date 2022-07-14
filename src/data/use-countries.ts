import useSWR from 'swr'
import {API} from '../utils'

const getAllCountries = async () => {
  try {
    const resp = await fetch(API + '/all')
    if (resp.ok) return resp.json()
    Promise.reject(resp)
  } catch (err) {
    console.error(err)
  }
}

export const useGetAllCountries = () => {
  const {data, error} = useSWR('countries', getAllCountries)
  return {countries: data, error}
}
