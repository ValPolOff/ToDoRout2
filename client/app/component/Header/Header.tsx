//import "./Header.module.css"
import Image from 'next/image'
import style from './Header.module.css'
import { getToken, isAuth, removeToken, setToken } from '../store/token'
import jwt_decode from'jwt-decode'
export default function Header () {
    const jwtDec = () => {
        return jwt_decode<{email:string,id:number,role:string}>(localStorage.getItem('token') || '{}').email
    }
    return (
        
        <header className={style.header}>
            <div className={style.toDo}>To Do</div>
            <div className={style.userName}>{!isAuth() ? 'User Name': jwtDec()}</div>
            <button onClick={removeToken}>
                <Image src='bi_person-circle.svg' alt={style.imageProf}  width={40} height={40} />
            </button>
        </header>
    )
}