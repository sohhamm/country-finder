import {createFileRoute} from '@tanstack/react-router'
import CountryDetails from '../pages/CountryDetails'

export const Route = createFileRoute('/$slug')({
  component: CountryDetails,
})