import Image from "next/image";
import { ReactNode, useState } from "react";
import s from './Panel.module.css'
import arrowPag from '../../../public/1695739192.svg'
import { Pagination } from "@mui/material";


interface ModalType {
    children?: ReactNode;
    count:number;
    setCount: (obj:number) => void;
    textTask:{
        id: number;
        text: string;
        time: string;
        performance: boolean;
    }[];
    sort:any;

  }
export default function SortData (props:ModalType) {
    console.log(props.sort)
    let page = props.sort;
    const handleKeyDownPag = (event:any) => {
        if (event.key === "ArrowRight") {
        console.log("ArrowRight")
        props.setCount(( props.count+1 >=  Math.ceil(page/5) ?  Math.ceil(page/5):props.count+1))
        } else if (event.key === 'ArrowLeft') {
        props.setCount(props.count-1<=0? props.count:props.count-1)
        
        }
  };
  const [valuePage,setValuePage] = useState('')
  const handleKeyDown = (event:any) => {
      if (event.key === 'Enter') {
      props.setCount((+valuePage >=  Math.ceil(page/5) ?  Math.ceil(page/5) : +valuePage <= 0 ? +valuePage+1:+valuePage))
      } else if (event.key === 'Escape') {
      setValuePage('')
      
      }
};

    const handleChange = (event:any, value:number) => {
        props.setCount(value);
    };
    
    return (
        <div>
{/*            
    <div className={s.pagination}>
                <button  onClick={() => props.setCount(props.count-1<=0? props.count:props.count-1)} onKeyDown={handleKeyDownPag}>
                    <Image src={arrowPag} width={25} height={25} alt='a' className={s.revers}/>
                </button>
                <div className={s.count}>{props.count}</div>
                <button onKeyDown={handleKeyDownPag} onClick={() => props.setCount( props.count+1 >= Math.ceil(page/5) ? Math.ceil(page/5):props.count+1)} >
                    <Image src={arrowPag} width={25} height={25} alt='b' />
                </button>
    </div>*/}
            <div className={s.pagination}>
                <Pagination count={Math.ceil(props.sort/5)} 
                variant="outlined" 
                color="primary" 
                size="small" 
                showFirstButton 
                showLastButton 
                boundaryCount={1} 
                siblingCount={0}
                onChange={handleChange}
                page={props.count}
                />
            </div>
            
            {/*<div className={s.inputPageTitle}>Enter page</div>
            <input className={s.inputPage} 
            onKeyDown={handleKeyDown} 
            placeholder={`${Math.ceil(page/5)}`} 
            value={+valuePage >=  Math.ceil(page/5) ?  Math.ceil(page/5) : +valuePage <= 0 ? '' : +valuePage} onChange={(event) => setValuePage(event.target.value)}>
</input>*/}

        
        </div>           
    
    )}
