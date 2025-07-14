import {createFileRoute} from '@tanstack/react-router'
import {z} from 'zod'
import Home from '../pages/Home'

const searchSchema = z.object({
  search: z.string().optional(),
  region: z.string().optional(),
  subregion: z.string().optional(),
  populationRange: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
  areaRange: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
  language: z.string().optional(),
  currency: z.string().optional(),
  landlocked: z.boolean().optional(),
  unMember: z.boolean().optional(),
  independent: z.boolean().optional(),
  sortBy: z.enum(['name', 'population', 'area', 'region']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
})

export const Route = createFileRoute('/')({
  validateSearch: searchSchema,
  component: Home,
})