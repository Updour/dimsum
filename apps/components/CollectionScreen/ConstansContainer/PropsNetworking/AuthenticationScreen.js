import { urlXmetrik, urlMetrikPulsa } from './index'

export const netAuth = () => (
  data = urlXmetrik() + 'login/'
)
export const netAuthen = () => (
  data = urlMetrikPulsa() + 'login/'
)