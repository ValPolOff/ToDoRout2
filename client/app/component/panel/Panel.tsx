"use client"
//import "./styles.css";

import useModal from "../../hook/useModal";
import Image from 'next/image'
import s from './Panel.module.css'
import React, { useState, useEffect, ReactNode } from 'react';
import TaskToDo from "../TaskToDo/TaskToDo";
import ModalSave from "../Modal/ModalSave";
import PopUpSort from "../PopUpSort/PopUpSort";
import SortData from "./SortData";

import { useGetTaskQuery } from "../api/api";
//import { IPost } from "./IPost";
import arrows from '../../../public/arrows 1.svg'
import Vector from '../../../public/Vector.svg'
import Vector1 from '../../../public/Vector (1).svg'
import done1 from '../../../public/done 1 (1).svg'
import done2 from '../../../public/done 1.svg'
import { ITask } from "../types/ITask";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Panel() {
    //INITIAL STATE
    const [textTask, setTextTask] = useState([
        {id:1, text:"Task 1", time: '12:30:00', performance:false},
        {id:2, text:"Task 2", time: '12:10:00', performance:false},
        
    ]);

    const { isOpen, toggle } = useModal();
    const [value,setValue] = useState('');
    const [name,setName] = useState('All');
    const [sort,setSort] = useState('ASK')
    const [count,setCount] = useState(1)
    const [task,setTask] = useState<[ITask] | undefined>()
    
    useEffect(()=>{
        console.log(textTask,'1')
        setTextTask(textTask)
    },[textTask])
    
        const page = count;
        const pageAndSort = {sort, page}
        const {isLoading, data } = useGetTaskQuery(pageAndSort,{refetchOnMountOrArgChange:true})
        console.log(name)
        console.log(data)

      useEffect(()=>{
        console.log(sort)
        setSort(sort)
      },[sort])

      useEffect(()=>{
        setTimeout(()=>{setTask(data?.rows)
        console.log(data?.rows)},100)
      },[data?.rows])



    return (
        <div>
            <ToastContainer position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"
            />
            <div className={s.panel}>
                <div>
                    <button className={s.panelToday} onClick={()=>{setSort('Today'),setCount(1),setValue('')}}>
                        <Image alt='today' src={Vector} width={22} height={22} />
                        <div>Today</div>
                    </button>
                    <button  className={value === '2' ? s.panelAll2 : s.panelAll} onClick={() => {toggle(),setValue('2')}}>
                        {value === '2' ? (<Image src={done1} width={25} height={25} alt='yes'/>) : (<Image alt='all' src={done2} width={27} height={27} />) }
                        {name}
                    </button>
                    <button className={s.panelData} onClick={() => {setSort('ASC' === sort ? 'DESC':'ASC'),setCount(1),setValue('')/*sortData(),sort === 4 ? setSort(6) : setSort(4),setsortDataValue(true)*/}}>
                        <Image alt='data' src={arrows} width={27} height={27} />
                        Data
                    </button>
                    <button className={s.panelAddTask} onClick={() => {toggle(),setValue('1')}} autoFocus>
                        <Image alt='Add task' src={Vector1} width={25} height={25} />
                        Add task
                    </button>
                </div>

                <div className={s.text}>
                                  
                        
                        {   isLoading ? 'Loading...': task?.map((text1,index)=>{
                        return (
                            <>
                                <TaskToDo index={text1.id} text1={text1} setObjTask={setTextTask} objTask = {textTask} />
                            </>
                        )})
                        }
                        {(data?.count ?? count) /5 <= 1 ? <></>:<SortData count={count} setCount={setCount} textTask={textTask} sort={data?.count}/>}
                </div>
          
            </div>
            
            <PopUpSort isOpen={isOpen} toggle={toggle} name={setName} value={value} count={setCount} setSort={setSort}/>
            <ModalSave isOpen={isOpen} toggle={toggle} task={setTextTask} objTask = {textTask} value={value}/>
        </div>
    )
}