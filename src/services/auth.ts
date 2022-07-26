import { instance } from "./api"

export const get_token = async(email:string,password:string) =>{
    const res = await instance.get('/user/login',{
        data:{
            email:email,
            password:password
        }
    })
}

export const register_user =async (email:string,password:string,password_confirm:string) => {
    await instance.post('/user/register',{
        email:email,
        password:password,
        password_confirm:password_confirm
    }).then((response)=>{
        if(response.status == 200){
            return response.data
        }        
    })
}