import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <div>
        <div className="flex gap-5 animated-gradient-bg">
            <Image
        src={"/images/Linkedin-ayro.jpeg"}
        alt = "picture of ayro"
        sizes='100vw'
         width ="300"
        height="300"
        style={{
            width :"10%",
            height:"10%"
        }}
       
        />
        
        <Image
        src={"/images/Linkedin-Aidan.jpeg"}
        alt = "picture of ayro"
        width ="500"
        height ="300"
        style={{
            width :"10%",
            height:"10%"
        }}
        />
        
        <Image
        src={"/images/Linkedin-Phuc.jpeg"}
        alt = "picture of ayro"
        width ="500"
        height ="300"
        style={{
            width :"10%",
            height:"10%"
        }}
        /></div>
        
        
       
    </div>
    
  )
}

export default page