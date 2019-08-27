import { urlXmetrik, urlMetrikPulsa } from './index'


// *** from ppob screen *** \\
//  p === ppob || d === dpaket data == m == metrik pulsa


// for pln ppob
export const pNetPlnPasca = () => (
  data = urlXmetrik() + 'pln'
)
export const mNetPlnPasca = () => (
  data = urlMetrikPulsa() + 'pln'
)
// pgn
export const pNetPgN = () => (
  data = urlXmetrik() + 'pgn'
)
export const mNetPgN = () => (
  data = urlMetrikPulsa() + 'pgn'
)
// bpjs
export const pNetbPjs = () => (
  data = urlXmetrik() + 'bpjs'
)
export const mNetbPjs = () => (
  data = urlMetrikPulsa() + 'bpjs'
)
// finance
export const pNetFinances = () => (
  data = urlXmetrik() + 'tagihan'
)
export const mNetFinances = () => (
  data = urlMetrikPulsa() + 'tagihan'
)
// pdam
export const pNetpDam = () => (
  data = urlXmetrik() + 'pdam'
)
export const mNetpDam = () => (
  data = urlMetrikPulsa() + 'pdam'
)
// TELKOM
export const pNettelKom = () => (
  data = urlXmetrik() + 'telkom'
)
export const mNettelKom = () => (
  data = urlMetrikPulsa() + 'telkom'
)
// TV
export const pNetTvs = () => (
  data = urlXmetrik() + 'tv'
)
export const mNetTvs = () => (
  data = urlMetrikPulsa() + 'tv'
)
// zona data tsel ppob

// *** for paket data telkomsel
export const dpNetTselDatas = () => (
  uri = 'http://xmetrik.biz:9700/tseldata'
)
// for paket telpon
export const dpNetTselPhone = () => (
  uri = 'http://xmetrik.biz:9700/telpon'
)