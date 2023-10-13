"use client"
//import "./styles.css";

import useModal from "../../hook/useModal";
import Image from 'next/image'
import s from './TaskToDo.module.css'
//import Modal from '../Modal/Modal'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import PopUp from "../PopUp/PopUp";
import { useUpdateTaskMutation } from "../api/api";

interface ModalType {
    children?: ReactNode;
    index:number;
    text1:{
        id: number;
        completed: boolean;
        text: string;
        data: string;
        createdAt: string;
        updatedAt:string;
    };
    setObjTask: (obj:{ id: number; text: string; time: string; performance:boolean}[]) => void;
    objTask: {
        id: number;
        text: string;
        time: string;
        performance: boolean;
    }[];

  }

export default function TaskToDo (props:ModalType) {
    const { isOpen, toggle } = useModal();
    useEffect(()=>{
        props.setObjTask(props.objTask)
    },[props.text1])
        const [updateTask] = useUpdateTaskMutation()
        console.log(new Date().getUTCFullYear().toString() + '-'+ (new Date().getUTCMonth()+1).toString() +'-'+ (new Date().getUTCDate().toString() > '10' ? new Date().getUTCDate().toString() : '0' + new Date().getUTCDate().toString()));
        return (
            <>
            <div key={props.index}>
                <div className={s.t}>
                    <div className={s.task}>
                        <div className={s.task1}>
                            <button onClick={() => {updateTask({id:props.index,completed:!props.text1.completed===true})}}>  
                                {props.text1.completed===true ? (<Image alt='ok' src='Check_ring.svg' width={25} height={25} />):(<Image alt='ok' src='Group.svg' width={25} height={25} />)}
                            </button>
                            {<div>{props.text1?.text?.length > 10 ? props.text1.text.substring(0,10) + '...': props.text1.text}</div>}
                        </div>

                        <div className={s.task2}>
                            
                            
                            {<div >{props.text1.createdAt.slice(0,10) === new Date().getUTCFullYear().toString() + '-'+ (new Date().getUTCMonth()+1).toString() +'-'+ (new Date().getUTCDate().toString() > '9' ? new Date().getUTCDate().toString() : '0' + new Date().getUTCDate().toString()) ? `Today ${props.text1.createdAt.slice(11,19)}`: props.text1.createdAt.slice(0,10)}</div>}
                            <button onClick={() => { toggle();}}>
                                <Image alt='settings'  src='Vector (2).svg' width={4} height={4} />
                            </button>
     
                        </div>
                  


                    </div>
                    <div className={s.tt}>
                        <PopUp isOpen={isOpen} toggle={toggle} deleteIndex={props.index} setObjTask={props.setObjTask} objTask = {props.objTask} index={props.text1.id}/>
                    </div>
                    
                    </div>
                   
         
                    
            </div>
                                                                  
                
            </>
        ) 
}