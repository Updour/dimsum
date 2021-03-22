

export const formatPrice = (value) => {
    let val = (value/1).toFixed().replace('.', '')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
