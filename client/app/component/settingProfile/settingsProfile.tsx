import jwt_decode from'jwt-decode'

export default function settingsProfile () {
    const jwtDec = () => {
        return jwt_decode<{email:string,id:number,role:string}>(localStorage.getItem('token') || '{}')
    }
    return (
        <div>
            {jwtDec().email}
            {jwtDec().id}
        </div>
    )
}