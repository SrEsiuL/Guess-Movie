import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti';
import { movies } from './components/movies';
import { Movie } from './components/titleMovie';
import { Marcador } from './components/marcadores';
import { Titulo } from './components/titulo';

function App() {

  function validar() {
    if (inputValue.length > 0){
      if(movie.name.toUpperCase() == inputValue.toUpperCase()) {
        const newpoint = count + 1;
        confetti();
        setCount(newpoint);
        setInputValue("");
      }else{
        const newlive = live - 1;
        setInputValue("");
        setLive(newlive);
        setMistake(true)

        setTimeout(() => {
          setMistake(false)
        }, "500")
      }
    }
    
  }
  
  const [play,setPlay] = useState(false);
  const [count, setCount] = useState(0)
  const [live, setLive] = useState(3)
  const [movie, setMovie] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [mistake, setMistake]=useState(false)
  
  useEffect(() => {
    setMovie(movies[Math.floor(Math.random() * movies.length)]);
    setMistake(false)    
  },[count, live==0])
  

  return (
    <div className='container'>
      <>
        {!play ? <><Titulo text={"Guess Movie"} />
          <button className="play" onClick={()=> setPlay(!play)}>Play</button> </> : 
          <>
            <Marcador texto={"lives: "} marca={live} clase={"live"}/>
            <Marcador texto={"Point: "} marca={count} clase={"point"}/>
            <Titulo text={"Guess Movie"} />
            {live ? <>
              <Movie text={movie.emoji} />
              <form className='form-response'>
                <input required type="text" id="response" placeholder="Insert movie's name" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                <button type='submit' onClick={validar}>Send</button>
              </form> 
              {mistake ? 
                <div className='mistake'>
                  <p>💔</p>
                </div>:null
              }</> : 
              <div className='lose'>you lose!!<br />
              <button onClick={() => [setLive(3), setCount(0)]}>Retry</button>
              </div>
            }
            

          </>
        }
      </>
    </div>
  )
}

export default App
