import React from 'react'
import "./activeBtn.scss"
const ActiveBtn = ({item,active,setSelected}) => {
    return (
        <>
           <button className={active ? "timeBtn active" : "timeBtn"} onClick={()=>setSelected(item.id)}>{item.btn}</button> 
        </>
    )
}

export default ActiveBtn
