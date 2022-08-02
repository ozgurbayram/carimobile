export type AuthStackType = {
    Login:undefined,
    Register:undefined
}

export type AppStackType = {
    Home:undefined
    CreateProduct:undefined
    SearchProduct:undefined
    Basket:undefined
}

export type Product = {
    id:string
    name:string
    barcode:string
    price:number
    count?:number
}