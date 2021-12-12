const keyValueToString = ([key, value]) => {
    const isObject = Object.prototype.toString.call(value) === '[object Object]'

    if(isObject) {
        throw new Error('Value is an object')
    }

    return `${key}=${value}`
}


export function queryString(obj)
    {     return Object.entries(obj).map(keyValueToString).join('&')}

export function parse(string)
    {     return Object.fromEntries(
        string.split('&').map(elm => {

            let [key, value] = elm.split('=')

            if(value.indexOf(',') > -1){
                value = value.split(',')
            }

            return [key, value]
        })
    )}