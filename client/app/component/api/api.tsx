import { RootState, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITask } from '../types/ITask'
import { IData } from '../types/IData';
import { IUserToken } from '../types/IUserToken';
import { getToken } from '../store/token';



export const api = createApi({
    reducerPath: 'api',
    tagTypes:['Task'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        prepareHeaders: (headers/*, { getState }*/) => {
            /*const user = (getState() as RootState).auth.token
    
            if (user) {
                headers.set('Authorization', `Bearer ${user.token.access}`)
            }*/
            headers.set('authorization', `bearer ${getToken()}`);
    
            return headers
        },
    }),
    endpoints: builder => ({
        getTask: builder.query<IData, {sort:string;page:number}>({
            query:(e)=>`/post?sort=${e.sort}&page=${e.page}`,
            providesTags:() => ['Task']
        }),
        createTask: builder.mutation<ITask, {text:string;completed:boolean}>({
           query: (post) => ({
            body: post,
            url:'/post',
            method: 'POST',

           }),
           invalidatesTags:['Task']
        }),
        deleteTask: builder.mutation<ITask, {id:number}>({
            query: (post) => ({
             body: post,
             url:'/post',
             method: 'DELETE'
            }),
            invalidatesTags:['Task']
         }),
         updateTask: builder.mutation<ITask, {id:number;text:string}|{id:number;completed:boolean}>({
            query: (post) => ({
             body: post,
             url:'/post',
             method: 'PUT'
            }),
            invalidatesTags:['Task']
         }),
         createUser: builder.mutation<IUserToken, {email:string;password:string}>({
            query: (user) => ({
             body: user,
             url:'/user/registration',
             method: 'POST',
 
            }),
            //invalidatesTags:['Task']
         }),
         getCheck: builder.query<IUserToken, null>({
            query: () => ({
             url:'/user/auth',
            }),
            //invalidatesTags:['Task']
         }),
         createLogin: builder.mutation<IUserToken, {email:string;password:string}>({
            query: (user) => ({
             body: user,
             url:'/user/login',
             method: 'POST',
 
            }),
            
            //invalidatesTags:['Task']
         }),
         
    })

})

export const {useGetTaskQuery,
            useCreateTaskMutation,
            useDeleteTaskMutation,
            useUpdateTaskMutation,
            useCreateUserMutation,
            useGetCheckQuery, 
            useCreateLoginMutation} = api;
