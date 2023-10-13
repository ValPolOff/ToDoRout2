import jwt_decode from'jwt-decode'

export const getToken = () => {
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        return localStorage.getItem('token')
      }
  //return localStorage.getItem('token');
};

export const setToken = (token: string) => {
  localStorage.token = token;
};
export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuth = () => {
  if (typeof window !== 'undefined') {
        // Perform localStorage action
        return localStorage.getItem('token') !== null
  }
  //return localStorage.getItem('token') !== null;
};

