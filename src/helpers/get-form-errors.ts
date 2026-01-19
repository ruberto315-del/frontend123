const getFormErrors = (errors: any) => {
    if (!errors) return[]
    const keys = Object.keys(errors)
    const errorsArray = keys.flatMap(key => {
        return errors[key]._errors
        
    })
    return errorsArray.filter(el => !!el)
}

export default getFormErrors