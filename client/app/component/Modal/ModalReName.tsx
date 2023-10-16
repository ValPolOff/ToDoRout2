import React, { ReactNode, useEffect, useState } from "react";
import s from './Modal.module.css'
import Image from "next/image";
import useModal from "@/app/hook/useModal";
import { useUpdateTaskMutation } from "../api/api";
import save from '../../../public/Check_ring.svg'
import close from '../../../public/material-symbols_today.svg'

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    task: (obj:{ id: number; text: string; time: string; performance:boolean}[]) => void;
    value:string;
    objTask: {
      id: number;
      text: string;
      time: string;
      performance: boolean;
  }[];
    index:number;
  }

export default function ModalReName (props: ModalType) { 
    const [taskN, setTask] = useState('')
      const [errorText, setErrorText] = useState('')
      const [updateTask] = useUpdateTaskMutation()
      const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
          console.log('Int')
          props.objTask.map((e)=>e.text).includes(taskN) || taskN.replaceAll(' ','')==='' || taskN.length === 0 ? setErrorText('You did not enter text or such a task already exists') : (updateTask({id:props.index,text:taskN}),setErrorText(''),props.toggle(),setTask(''))
        } else if (event.key === 'Escape') {
          console.log('Esc')
          props.toggle(),setErrorText(''),setTask('')
        }
      };

    
    return (
        <>
          {props.isOpen && props.value === '1' && (
            <div className={s.modalOverlay} onClick={() => {props.toggle(),setErrorText(''),setTask('')}}>
              <div onClick={(e) => e.stopPropagation()} className={s.modalBox}>
                {props.children}
                <div>
                  <div className={s.h1}>Rename task</div>
                  <input onKeyDown={handleKeyDown} className={s.interTask} placeholder="Enter text..." value={taskN} onChange={(event) => setTask(event.target.value)} autoFocus></input>
                  <div className={s.blockH1}>
                    <button className={s.save} onClick={() => {props.objTask.map((e)=>e.text).includes(taskN) || taskN.replaceAll(' ','')==='' || taskN.length === 0 ? setErrorText('You did not enter text or such a task already exists') : (updateTask({id:props.index,text:taskN}),setErrorText(''),props.toggle(),setTask(''))}}>
                      <Image alt='okTask' src={save} width={25} height={25} />
                      Save
                    </button>
                    <button className={s.close} onClick={() => {props.toggle(),setErrorText(''),setTask('')}}>
                      <Image alt='noTask' src={close} width={25} height={25} />
                      Close
                    </button>
                  </div>
                  <div className={s.errorText}>{errorText}</div>
                  
          </div>
              </div>
              
            </div>
          )}
        </>
        )
}