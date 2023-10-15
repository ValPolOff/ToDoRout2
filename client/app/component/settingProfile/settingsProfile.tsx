import jwt_decode from'jwt-decode'
import s from './SettingsProfile.module.css'
import { useGetTaskQuery } from '../api/api'
import { removeToken } from '../store/token'

export default function SettingsProfile () {
    const page = 1
    const sort = 'ASK'
    const pageAndSort = {page,sort}
    const {isLoading, data } = useGetTaskQuery(pageAndSort)
    const jwtDec = () => {
        return jwt_decode<{email:string,id:number,role:string}>(localStorage.getItem('token') || '{}')
    }
    return (
        <div className={s.settings}>
            <div>{`Email: ${jwtDec().email}`}</div>
            <div>{`id: ${jwtDec().id}`}</div>
            <div>{`Total number of tasks: ${data?.count}`}</div>
            <button className={s.exit} onClick={removeToken}>Exit</button>
        </div>
    )
}