export const validateEmail = (email:string):boolean =>{
    const re = /\S+@\S+\.\S+/;
    return re.test(email)
}

export const validatePassword = (password:string):boolean =>{
    return password.length>=8?true:false
}

export const validateBarcode = (barcode:string):boolean =>{
    const barcodeArray = barcode.split('')
    if(barcodeArray.length<13 || barcodeArray.length>13) {
        return false
    }
    let sum = 0;
    const checkDigit = parseInt(barcode[barcodeArray.length-1])
    for (let i = 1; i < barcodeArray.length; i++) {
        const element = parseInt(barcodeArray[i-1])
        sum += i%2==0?element*3:element*1
    }
    
    return Math.ceil(sum/10)*10-sum == checkDigit
}