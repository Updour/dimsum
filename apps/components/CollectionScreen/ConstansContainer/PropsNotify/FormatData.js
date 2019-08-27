import moment from 'moment';

// format price
export const formatPrice = (value) => {
	let val = (value/1).toFixed().replace('.', '')
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// format date
export const formatDate = (value) => {
	if (! value) return ''
		value = value.toString()
	return moment(value).format('DD/MM/YYYY HH:mm:ss')
}
// format date
export const formatDateChart = (value) => {
	if (! value) return ''
		value = value.toString()
	return moment(value).format('DD/MM/YYYY')
}
