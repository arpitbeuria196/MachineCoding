import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const[memes, setmemes] = useState([]);

  useEffect(()=>{

    fetchMemes();
    window.addEventListener("scroll",handleScroll);

    return ()=> window.removeEventListener("scroll", handleScroll);

  },[])

  const handleScroll = ()=> {
    if(window.scrollY + window.innerHeight >=document.body.scrollHeight-1)
    {
      console.log("fetch Data");
      fetchMemes();
    }
  }


  const fetchMemes = async ()=>
  {
    try {

      const fetchData = await fetch("https://meme-api.com/gimme/5");
      const json = await fetchData.json();
      setmemes(json.memes);
      console.log(json.memes);

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      {
        memes.length >0 && (
          <div>
            {
              memes.map((meme,index)=>(
                <div key={index}>
                  <img
                  
                  src={meme.url}
                  />
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default App
