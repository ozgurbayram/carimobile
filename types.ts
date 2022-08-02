export type AuthStackType = {
    Login:undefined,
    Register:undefined
}

export type AppStackType = {
    Home:undefined
    CreateProduct:undefined
    SearchProduct:undefined
    Basket:undefined
    Payment:undefined
    CompleatedPayments:undefined
}

export type Product = {
    id:string
    name:string
    barcode:string
    price:number
    count?:number
}
export type PaymentInfo = {
    id: string
    products:Product[],
    amount:number,
    created_at:Date,
    companyName:string,
    recipient:string
}