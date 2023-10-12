import { useState } from 'react'
import s from './Auth.module.css'
import { useCreateUserMutation } from '../api/api'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import { data } from 'autoprefixer';

export default function Auth () {
    const [auth,setAuth] = useState()
    const [email, setImail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [createUser,data] = useCreateUserMutation()
    //console.log(data.data?.token)
    //const token = data.data?.token;
    //console.log(data.data?.token)
    
    const storage = (token) => {
        localStorage.setItem('token', token)
    }
    //localStorage.setItem('token', token)
    //localStorage.getItem('token', data.token)
    return(
        <div className={s.auth}>
            Регистрация
            <input className={s.inp} placeholder="Введите email" value={email} onChange={(e)=> setImail(e.target.value) }></input>
            <div className={s.password}>
                <input type={visible ? "password":''} className={s.inp} placeholder="Введите password" value={password} onChange={(e)=> setPassword(e.target.value)}>
                </input>
  
                    <button className={s.visiblePassword} onClick={()=>{setVisible(visible?false:true)}}>
                        {visible ? <VisibilityOffIcon fontSize="small"></VisibilityOffIcon> :<VisibilityIcon fontSize="small"></VisibilityIcon>  }
                    </button>

            </div>
            <button className={s.but} onClick={()=>{createUser({email:email,password:password}),storage(data.data?.token)}}>Войти</button>
            <a href='http://localhost:3000/api'>Log in</a>
        </div>
    )
}