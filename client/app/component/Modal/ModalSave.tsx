import React, { ReactNode, useEffect, useState } from "react";
import s from './Modal.module.css'
import Image from "next/image";
import { useCreateTaskMutation } from "../api/api";

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
  }[]
  }

export default function ModalSave (props: ModalType) {
    const [taskN, setTask] = useState('')
      const [errorText, setErrorText] = useState('') 
      const handleKeyDown = (event:any) => {
        if (event.key === 'Enter') {
          //console.log('Int')
          props.objTask.map((e)=>e.text).includes(taskN) || taskN.replaceAll(' ','')==='' || taskN.length === 0 ? setErrorText('You did not enter text or such a task already exists') : (setErrorText(''),props.toggle(),setTask(''),createTask({text:taskN, completed:false}))
        } else if (event.key === 'Escape') {
          //console.log('Esc')
          props.toggle(),setErrorText(''),setTask('')
        }
      };
      const [createTask] = useCreateTaskMutation()
      
      return (
        <>
          {props.isOpen && props.value === '1' && (
            <div className={s.modalOverlay} onClick={() => {props.toggle(),setErrorText(''),setTask('')}}>
              <div onClick={(e) => e.stopPropagation()} className={s.modalBox}>
                {props.children}
                <div>
                  <div className={s.h1}>Create task</div>
                  <input tabIndex={0} onKeyDown={handleKeyDown} className={s.interTask} placeholder="Enter text..." value={taskN} onChange={(event) => setTask(event.target.value)} autoFocus></input>
                  <div className={s.blockH1}>
                    <button className={s.save} onClick={() => {props.objTask.map((e)=>e.text).includes(taskN) || taskN.replaceAll(' ','')==='' || taskN.length === 0 ? setErrorText('You did not enter text or such a task already exists') : (setErrorText(''),props.toggle(),setTask(''),createTask({text:taskN, completed:false}))}}>
                      <Image alt='okTask' src='Check_ring.svg' width={25} height={25} />
                      Save
                    </button>
                    <button className={s.close} onClick={() => {props.toggle(),setErrorText(''),setTask('')}}>
                      <Image alt='noTask' src='material-symbols_today.svg' width={25} height={25} />
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