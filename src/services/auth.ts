import { instance } from "./api"

export const get_token = async(email:string,password:string) =>{
    console.log("hello");
    
    await instance.post('/user/login',{
        "email":email,
        "password":password
    },{
        headers:{
            "Content-Type":"application/json"
        }
    }).then((res)=>{
        return res
    }).catch((err)=>{
        console.error(err);
    })
}

export const register_user =async (email:string,password:string,password_confirm:string) => {
    await instance.post('/user/register',{
        email:email,
        password:password,
        password_confirm:password_confirm
    }).then((response)=>{
        console.log(response.data,response.status);
    }).catch((err)=>{
        console.error(err);
    })
}