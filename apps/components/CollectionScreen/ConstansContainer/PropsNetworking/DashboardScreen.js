import { urlXmetrik, urlMetrikPulsa } from './index'

// *** for eletric || pulsa *** \\
// e === eletric net === network s=== second

// provider regular
export const eNetProviderReg = () => (
  uri = urlXmetrik() + 'prov_reguler/'
)
export const sNetProviderReg = () => (
  uri = urlMetrikPulsa() + 'prov_reguler/'
)

// provider all
export const eNetProviders = () => (
  uri = urlXmetrik() + '/provider'
)
export const sNetProviders = () => (
  uri = urlMetrikPulsa() + '/provider'
)

// for paket data
export const eNetType = () => (
  uri = urlXmetrik() + 'jenis/'
)
export const sNetType = () => (
  uri = urlMetrikPulsa() + 'jenis/'
)

// for type eletric
export const eNetTypes = () => (
  uri =urlXmetrik() + 'jenisreg/'
)
export const sNetTypes = () => (
  uri =urlMetrikPulsa() + 'jenisreg/'
)

// for type all results eletric



// cek transaction
export const eNetCheking = () => (
  uri = urlXmetrik() + 'purchase/'
)
export const sNetCheking = () => (
  uri = urlMetrikPulsa() + 'purchase/'
)

// *** for ppob screen *** \\
// p == ppob 

// for pln
export const pNetPln = () => (
  uri = urlXmetrik() + 'pln'
)
export const pSecPln = () => (
  uri = urlMetrikPulsa() + 'pln'
)

// /for bpjs
export const pNetBpjs = () => (
  uri = urlXmetrik() + 'bpjs'
)
export const pSecBpjs = () => (
  uri = urlMetrikPulsa() + 'bpjs'
)

// /for pgn
export const pNetPgn = () => (
  uri = urlXmetrik() + 'pgn'
)
export const pSecPgn = () => (
  uri = urlMetrikPulsa() + 'pgn'
)

// /for finance
export const pNetFinance = () => (
  uri = urlXmetrik() + 'tagihan'
)
export const pSecFinance = () => (
  uri = urlMetrikPulsa() + 'tagihan'
)

// /for tv
export const pNetTv = () => (
  uri = urlXmetrik() + 'tv'
)
export const pSecTv = () => (
  uri = urlMetrikPulsa() + 'tv'
)

// /for telkom 
export const pNetTelkom = () => (
  uri = urlXmetrik() + 'telkom'
)
export const pSecTelkom = () => (
  uri = urlMetrikPulsa() + 'telkom'
)

// /for telkom 
export const pNetPdam = () => (
  uri = urlXmetrik() + 'pdam'
)
export const pSecPdam = () => (
  uri = urlMetrikPulsa() + 'pdam'
)


// /for telkom 
export const pNetTselData = () => (
  uri = urlXmetrik() + 'tseldata'
)
export const pSecTselPhone = () => (
  uri = urlMetrikPulsa() + 'telpon'
)