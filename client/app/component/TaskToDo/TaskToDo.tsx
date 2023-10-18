"use client"
//import "./styles.css";

import useModal from "../../hook/useModal";
import Image from 'next/image'
import s from './TaskToDo.module.css'
//import Modal from '../Modal/Modal'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import PopUp from "../PopUp/PopUp";
import { useUpdateTaskMutation } from "../api/api";
import settings from '../../../public/Vector (2).svg'
import ok from '../../../public/Check_ring.svg'
import no from '../../../public/Group.svg'

import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';

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
        //console.log(new Date().getUTCFullYear().toString() + '-'+ (new Date().getUTCMonth()+1).toString() +'-'+ (new Date().getUTCDate().toString() > '10' ? new Date().getUTCDate().toString() : '0' + new Date().getUTCDate().toString()));
        const [checked, setChecked] = React.useState(false);
        const containerRef = React.useRef<HTMLElement>(null);
      
        const handleChange = () => {
          setChecked((prev) => !prev);
        };
        console.log(props.text1.createdAt.slice(0,10))
        console.log(new Date().getUTCFullYear().toString() + '-'+ (new Date().getUTCMonth()+1).toString() +'-'+ (new Date().getUTCDate().toString() > '9' ? new Date().getUTCDate().toString() : '0' + new Date().getUTCDate().toString()))
        return (
            <>
            <div key={props.index}>
                <div className={s.t}>
                    <div className={s.task}>
                        
                        <div className={s.task1}>
                            <button onClick={() => {updateTask({id:props.index,completed:!props.text1.completed===true})}}>  
                                {props.text1.completed===true ? (<Image alt='ok' src={ok} width={25} height={25} />):(<Image alt='ok' src={no} width={25} height={25} />)}
                            </button>
                            {<div>{props.text1?.text?.length > 7 ? props.text1.text.substring(0,7) + '...': props.text1.text}</div>}
                        </div>

                        <div className={s.task2}>
                            
                            
                            {<div >{props.text1.createdAt.slice(0,10) === new Date().getUTCFullYear().toString() + '-'+ (new Date().getUTCMonth()+1).toString() +'-'+ (new Date().getUTCDate().toString() < '9' ? new Date().getUTCDate().toString() : '0' + new Date().getUTCDate().toString()) ? `Today ${props.text1.createdAt.slice(11,19)}`: props.text1.createdAt.slice(0,10)}</div>}
                            
                            
                            <button onClick={() => { toggle();}}>
                                <Image alt='settings'  src={settings} width={4} height={4} />
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