//import "./Header.module.css"
import Image from 'next/image'
import style from './Header.module.css'
import { getToken, isAuth, removeToken, setToken } from '../store/token'
import jwt_decode from'jwt-decode'
import SettingsProfile from '../settingProfile/settingsProfile'
import Token from '../token/Token'
import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import profile from '../../../public/bi_person-circle.svg'
import { useRouter } from 'next/navigation'



export default function Header () {
    /*const jwtDec = () => {
        return jwt_decode<{email:string,id:number,role:string}>(getToken() || '{}').email
    }*/

    /*const getInfo = () => {
        console.log('INFO')
        return (
            <SettingsProfile />
        )
    }*/

    //const route = useRouter()
    return (
        
        <header className={style.header}>
            
                <div className={style.toDo}><Link href={'/app/task'}>To Do</Link></div>
            
            <div className={style.userName}>{!isAuth() ? 'User Name': Token()}</div>
            <Link href='/app/settings'>
                <button>
                    <Image src={profile} alt={style.imageProf}  width={40} height={40} />
                </button>
            </Link>
        </header>
    )
}