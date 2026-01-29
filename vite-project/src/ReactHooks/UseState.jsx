import { useEffect,useState } from "react";

import React from 'react'       

const UseState = () => {
    const [count, setCount] = useState(0);


    useEffect(() => {
// Code We Want to run in Curly Bracket 
console.log('the count is', count);
// Optional return or Clean Up Function

    },[count]); // Dependency array 
  return (
    <div>
       <h1>Count: {count}</h1>
       <button onClick={()=> setCount(count+1)}>Increament</button>
       <button onClick={()=> setCount(count-1)}>Decreament</button>
    </div>
  )
}

export default UseState
