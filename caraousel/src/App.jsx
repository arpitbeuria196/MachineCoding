import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const images = ["https://i.ibb.co/ncrXc2V/1.png",
                  "https://i.ibb.co/B3s7v4h/2.png",
                  "https://i.ibb.co/XXR8kzF/3.png",
                  "https://i.ibb.co/yg7BSdM/4.png"]

  const [data,setData] = useState(images);

  const [currentIndex,setCurrentIndex] = useState(0);
  

  const handlePrev = ()=>
  {
    setCurrentIndex(prev => {
      const newIndex = prev == 0 ? images.length -1 : prev-1 ;
      console.log("Prev Index:", newIndex);
      return newIndex;

    })
  }

  useEffect(()=>{
   const timer = setInterval(()=>{
      handleNext();
    },2000)

    return ()=>{
      clearInterval(timer);
    }
  },[])

  const handleNext = () => {
    setCurrentIndex(prev => {
      const newIndex = (prev + 1) % images.length;
      console.log("Next Index:", newIndex); 
      return newIndex;
    });
  };

  return (
    <>
      <div className='flex items-center min-h-screen min-w-screen bg-gray-900 px-4'>
      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg">

      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={handlePrev}>Prev</button>
       <div className="w-[300px] h-[300px] overflow-hidden rounded-lg shadow-md">
       {
          <img 
          src={data[currentIndex]}/>
        }
       </div>
        <button 
         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={handleNext}>Next</button>
        </div>
      </div>
        
    </>
  )
}

export default App
