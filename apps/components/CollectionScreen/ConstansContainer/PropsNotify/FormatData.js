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
	return moment(new Date(value)).format('DD/MM/YYYY HH:mm:ss')
}

// format date
export const formatDateChart = (value) => {
	if (! value) return ''
		value = value.toString()
	return moment(new Date(value)).format('DD/MM/YYYY')
}
/*format print out*/
export const formatDatePrint = (value) => {
	if (! value) return ''
		value = value.toString()
	return moment(new Date(value)).format('YYYY-MM-DD')
}

