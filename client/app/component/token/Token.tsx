import { getToken, isAuth, removeToken, setToken } from '../store/token'
import jwt_decode from'jwt-decode'

export default function Token () {
    return jwt_decode<{email:string,id:number,role:string}>(getToken() || '{}').email

}