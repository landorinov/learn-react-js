import Cookies from 'js-cookie'
import Router from 'next/router'

export const delToken = () => {
    Cookies.remove('token')
    Router.push('/login')
}  

export const getToken = () => {
    const token = Cookies.get('token')
    return token;
}

export function setToken(userToken) {
    return Cookies.set("token", userToken)
}

export const isToken = () => {
    const token = Cookies.get('token')
    if(token) {
      return true
    }else{
      return false
    }
}  

export const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    'Authorization': 'Bearer ' + getToken(),
}

export const url = "http://localhost:8081/api"
