"use client"

import React, { useEffect, useRef, useState } from 'react'
import { UseGlobal } from '../context/GlobalContext'


function Header() {
  const {AddTodo,category, setCategory} = UseGlobal()
  const [linePosition, setLinePosition] = useState({left: 0, width: 0})
  const ActiveLink = useRef(null)


  useEffect(() => {
    const SetUnderLine= ()=>{
      if (ActiveLink.current) {
        const {offsetLeft, offsetWidth} = ActiveLink.current
        setLinePosition({left:offsetLeft - 40, width:offsetWidth + 80})
        console.log("offsetLeft: "+offsetLeft,"offsetWidth: "+ offsetWidth )
      }
    }
    SetUnderLine()
    window.addEventListener("resize",SetUnderLine)
    return()=>{
      window.removeEventListener("resize",SetUnderLine) 
    }
  }, [category])

  return (
    <header className='flex flex-col relative w-full items-center justify-center text-black py-5'>
      <p className='w-full text-center text-4xl font-bold mt-5'>#todo</p>
      <div className='flex lg:w-1/2 relative'>
      <ul className='flex items-center w-full relative lg:gap-48 md:gap-48 sm:gap-44 xs:gap-36 xxs:gap-20 pt-24 pb-5 justify-center border-b-2 '>
        {Menu?.map((item)=>{
          return(
            <button key={item.id} ref={`${category}` === item.name ? ActiveLink : null} className={`${item.name}`} onClick={(e)=> setCategory(item.name)}>
              {item.name}
            </button>
          )
        })}
      <div className='absolute bottom-0  bg-[#2f80ed] h-1.5  ' style={{width:`${linePosition.width}px`, left:`${linePosition.left}px`,borderTopLeftRadius:"1.5rem",borderTopRightRadius:"1.5rem"}}/>

      </ul>
      </div>

    </header>
  )
}

export default Header

const Menu = [
  {name:"All",route:"/", Icon:"",id:1},
  {name:"Active",route:"/", Icon:"",id:2},
  {name:"Completed",route:"/", Icon:"",id:3},
]

