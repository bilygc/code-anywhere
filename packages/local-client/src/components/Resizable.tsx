import "./css/Resizable.css"
import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: 
  | React.ReactChild
  | React.ReactChild[];
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {

  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.75);

  
  useEffect(() =>{
    let timer: any;
    const listener = ()=>{
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() =>{
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if(window.innerWidth * 0.75 < width){
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    }
    window.addEventListener("resize", listener);

    return() =>{
      window.removeEventListener("resize", listener);
    } ;
  },[width]);

  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal"){
    resizableProps ={
      className: "resize-horizontal",
      minConstraints:[innerWidth * 0.2, Infinity],
      maxConstraints:[innerWidth * 0.75, Infinity],
      height:Infinity,
      width,
      resizeHandles:['e'],
      onResizeStop: (event, data) =>{
        setWidth(data.size.width)
      },
    }
  }else{
    resizableProps = {
      maxConstraints:[Infinity, innerHeight * 0.9],
      minConstraints:[Infinity, innerHeight * 0.2 ],
      height:300,
      width:Infinity,
      resizeHandles:['s']
    }

  }

  return (
    //@ts-ignore
    <ResizableBox {...resizableProps} >
      {children} 
    </ResizableBox>
  );
};

export default Resizable;