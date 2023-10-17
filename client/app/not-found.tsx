'use client'
import './globals.css'
import { useRouter } from 'next/navigation';
import { isAuth } from './component/store/token';
export default function Custom404() {
  const route = useRouter()
    setTimeout(()=>{route.push(isAuth() ? '/app/task' : '/app/login' )},5000)
    return <h1>404 - Page Not Found</h1>
  }