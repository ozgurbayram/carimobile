export const validateEmail = (email:string):boolean =>{
    var re = /\S+@\S+\.\S+/;
    return re.test(email)
}

export const validatePassword = (password:string):boolean =>{
    return password.length>=8?true:false
}