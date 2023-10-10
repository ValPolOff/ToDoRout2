import { useState } from 'react'
import s from './Auth.module.css'

export default function Auth () {
    const [auth,setAuth] = useState()
    return(
        <div className={s.auth}>
            Авторизация
            <input className={s.inp} placeholder="Введите email"></input>
            <input className={s.inp} placeholder="Введите password"></input>
            <button className={s.but}>Войти</button>
        </div>
    )
}