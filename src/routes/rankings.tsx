import { createFileRoute } from '@tanstack/react-router'
import Rankings from '../pages/Rankings'

export const Route = createFileRoute('/rankings')({
  component: Rankings,
})