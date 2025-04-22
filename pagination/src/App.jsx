import { useEffect, useState } from 'react'

import './App.css'

function App() {
  //https://meme-api.com/gimme/10

  const [memeData,setMemeData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  const total_content = 5;

  const startIndex = (currentPage - 1)* total_content;

  const lastIndex = startIndex+ total_content;

  

  useEffect(()=>{
    fetchData();
  },[currentPage])

  const handleNext = ()=>
  {
    setCurrentPage(prev => (prev+1)%total_content);
    console.log(currentPage);
  }
  const handlePrev = ()=>
  {
    setCurrentPage((prev) =>{
      return prev = prev == 0 ? 4 : prev-1;
    });

    console.log(currentPage);
  }

  const fetchData = async ()=>
  {
    const data = await fetch(`https://meme-api.com/gimme/${total_content}`);
    const convertData = await data.json();
    setMemeData(convertData.memes);
    console.log(convertData);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <button onClick={handlePrev}>⬅️</button>
      <button onClick={handleNext}>➡️</button>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">🔥 Meme Gallery</h1>
  
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {memeData.length > 0 &&
          memeData.slice(startIndex,lastIndex).map((meme, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img
                src={meme.url}
                alt={`meme-${index}`}
                className="w-full h-[100px] object-cover"
              />
              <div className="px-2 py-1">
                <p className="text-xs text-gray-700 truncate">{meme.title}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
  
}

export default App
