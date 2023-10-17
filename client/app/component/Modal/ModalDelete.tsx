import React, { ReactNode, useState } from "react";
import s from './Modal.module.css'
import Image from "next/image";
import { useDeleteTaskMutation } from "../api/api";
import delet from '../../../public/material-symbols_today (1).svg'
import close from '../../../public/material-symbols_today.svg'
import { ToastContainer, toast } from "react-toastify";

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
    deleteIndex:number;
    value:string;
  }

export default function ModalDelete (props: ModalType) {

    const [deleteTask] = useDeleteTaskMutation()
    const notify = () => toast.error("Delete task", {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          })
    return (
        <>
          {props.isOpen && props.value == '2' && (
            <div className={s.modalOverlay} onClick={() => props.toggle()}>
              <div onClick={(e) => e.stopPropagation()} className={s.modalBox}>
                {props.children}
                <div>
                  <div className={s.h1}>Delete task</div>
                  <span className={s.areYou}>Are you sure about deleting this task?</span>
                  <div className={s.blockH1}>
                    <button className={s.delete} onClick={() => {deleteTask({id:props.deleteIndex}),props.toggle(),notify()}} autoFocus>
                      <Image alt='okTask' src={delet} width={25} height={25} />
                      Delete
                    </button>
                    <button className={s.close} onClick={props.toggle}>
                      <Image alt='noTask' src={close} width={25} height={25} />
                      Close
                    </button>
                  </div>

                </div>

              </div>
              
            </div>
            
          )}
  
        </>
        )
}