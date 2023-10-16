"use client"
import { useState } from 'react'
import s from './Auth.module.css'
import { useCreateLoginMutation, useCreateUserMutation, useGetCheckQuery } from '../api/api'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import { data } from 'autoprefixer';
import { getToken, setToken } from '../store/token';
import React, {useEffect ,ReactNode} from 'react';
import jwt_decode from 'jwt-decode';
import Link from 'next/link';



export default function Auth () {
    const [auth,setAuth] = useState(true)
    const [email, setImail] = useState('')
    const [password, setPassword] = useState('')
    const [visible, setVisible] = useState(false)
    const [createUser,data] = useCreateUserMutation()
    const [createLogin,data2] = useCreateLoginMutation()
    //const [createLogin,data] = useCreateLoginMutation()
    //console.log(data.data?.token)
    //const token = data.data?.token;
    //console.log(data.data?.token)
    
    /*const storage = (token:string|undefined ) => {
        localStorage.setItem('token', token)
    }*/
    /*const {data} = useGetCheckQuery(localStorage.getItem('token'))
    console.log(data)*/
    //localStorage.setItem('token', token)
    //localStorage.getItem('token', data.token)

    const clisk = () => {
        if (auth) {
            createUser({email:email,password:password});
            //props.toggle(!props.isOpen);
            //setToken(data.data?.token)

        } else {
            createLogin({email:email,password:password});
            //props.toggle(!props.isOpen);
            //setToken(data2.data?.token)
        }
    }
    console.log(data2)
    useEffect(()=>{
        if (data.data?.token){
        setToken(data.data?.token)}
    },[data])
    useEffect(()=>{
        if (data2.data?.token){
        setToken(data2.data?.token)}
    },[data2])
    //console.log(jwt_decode(data.data?.token))
  
    return(
        <div className={s.auth}>
            {auth ? 'Registrarion':'Log In' }
            <input className={s.inp} placeholder="Введите email" value={email} onChange={(e)=> setImail(e.target.value) }></input>
            <div className={s.password}>
                <input type={visible ? "password":''} className={s.inp} placeholder="Введите password" value={password} onChange={(e)=> setPassword(e.target.value)}>
                </input>
  
                    <button className={s.visiblePassword} onClick={()=>{setVisible(visible?false:true)}}>
                        {visible ? <VisibilityOffIcon fontSize="small"></VisibilityOffIcon> :<VisibilityIcon fontSize="small"></VisibilityIcon>  }
                    </button>
                    
            </div>

            
            <Link href='/app/task'>
                <button className={s.but} onClick={()=>{clisk()}}>{auth ? 'Registrarion':'Log In' }
                </button>
            </Link>
            <div className={s.errorLoginRegistration}>
                {auth ? data?.error?.data?.message : data2?.error?.data?.message}
            </div>
            <a  onClick={() => {auth ? setAuth(false): setAuth(true)}}>{auth ? 'Log In': 'Registrarion'}</a>
            <button></button>
            
        </div>
    )
}