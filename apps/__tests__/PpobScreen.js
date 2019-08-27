import { dataXmetrik, dataMetrikPulsa } from './index'


// *** from ppob screen *** \\
//  p === ppob || d === dpaket data == m == metrik pulsa


// for pln ppob
export const pNetPlnPasca = () => (
  data = dataXmetrik() + 'pln'
)
export const mNetPlnPasca = () => (
  data = dataMetrikPulsa() + 'pln'
)
// for bpjs 
export const pNetbpjs = () => (
  data = dataXmetrik() + 'bpjs'
)
export const mNetbpjs = () => (
  data = dataMetrikPulsa() + 'bpjs'
)

export const pNetPgn = () => (
  data = dataXmetrik() + 'pgn'
)
export const mNetPgn = () => (
  data = dataMetrikPulsa() + 'pgn'
)

export const pNetFinance = () => (
  data = dataXmetrik() + 'tagihan'
)
export const mNetFinance = () => (
  data = dataMetrikPulsa() + 'tagihan'
)

export const pNetTv = () => (
  data = dataXmetrik() + 'tv'
)
export const mNetTv = () => (
  data = dataMetrikPulsa() + 'tv'
)

export const pNetTelkom = () => (
  data = dataXmetrik() + 'telkom'
)
export const mNetTelkom = () => (
  data = dataMetrikPulsa() + 'telkom'
)

export const pNetPdam = () => (
  data = dataXmetrik() + 'pdam'
)
export const mNetPdam = () => (
  data = dataMetrikPulsa() + 'pdam'
)

// *** for paket data telkomsel
export const dpNetTselData = () => (
  data = dataXmetrik() + 'tseldata'
)
export const mDpNetTselData = () => (
  data = dataMetrikPulsa() + 'tseldata'
)
// for paket telpon
export const dpNetTselTelpon = () => (
  data = dataXmetrik() + 'telpon'
)
export const mDpNetTselTelpon = () => (
  data = dataMetrikPulsa() + 'telpon'
)