import { useEffect, useState } from 'react'

import './App.css'

function App() {
  //https://meme-api.com/gimme/10

  const [memeData,setMemeData] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);

  const total_content = 5;

  const startIndex = (currentPage - 1)* total_content;

  const lastIndex = startIndex+ total_content;


  const totalPages = Math.ceil(memeData.length / total_content);

  useEffect(()=>{
    fetchData();
  },[currentPage])

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }
  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const fetchData = async ()=>
  {
    const data = await fetch("https://meme-api.com/gimme/50");
    const convertData = await data.json();
    setMemeData(convertData.memes);
    console.log(convertData);
  }

  const pages = Array(totalPages).fill(0).map((_,i)=> i+1);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex">
      <div className='flex flex-col'>
      <button onClick={handlePrev}>⬅️</button>
      {
        pages.map((val,index)=>(
          <button onClick={()=> setCurrentPage(val)}>
            {val}
          </button>
        ))
      }
      <button onClick={handleNext}>➡️</button>
      </div>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">🔥 Meme Gallery</h1>
  
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
  {memeData.length > 0 &&
    memeData.slice(startIndex, lastIndex).map((meme, index) => (
      <div
        key={`${meme.id || index}-${currentPage}`}
        className="bg-white rounded-lg shadow-xs overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-sm border border-gray-100"
      >
        <div className="aspect-square"> {/* Ensures square cards */}
          <img
            src={meme.url}
            alt={meme.title || `Meme ${index}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-1">
          <p className="text-[10px] text-gray-700 truncate px-1">
            {meme.title || "Untitled"}
          </p>
          <p className="text-[8px] text-gray-400 truncate px-1">
            r/{meme.subreddit || 'meme'}
          </p>
        </div>
      </div>
    ))}
</div>

    </div>
  );
  
}

export default App
