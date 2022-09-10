import backArrow from "./assets/arrow-left.svg"
import SearchBar from "./SearchBar"
import speaker from "./assets/volume-2.svg"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function Result({useMainWord, usePhonetic, usePos, useDef, useLink, setDef, useData, useVoice, setMain, setPho, setPoss, setLink, setData, setVoice,setErr, useErr, setRecent, useRecent, useLoad, setLoad})
{
   const [noun, setNoun] = useState(true)
   const [verb, setVerb] = useState(false)
   const [adj, setAdj] = useState(false)
   const [num, setNum] = useState(0)

   const audioRef = useRef()

   useEffect(()=>{
    setNoun(true)
    setVerb(false)
    setAdj(false)
    setNum(0)
   }, [useMainWord])

   function handleNoun(){
    setNoun(true)
    setVerb(false)
    setAdj(false)
    setNum(0)
    
    setDef([
        useData[0].meanings[0]?.definitions[0]?.definition,
        useData[0].meanings[0]?.definitions[1]?.definition,
        useData[0].meanings[0]?.definitions[2]?.definition
    ])
} 

    function handleVerb(){
    setNoun(false)
    setVerb(true)
    setAdj(false)
    setNum(1)
    setDef([
        useData[0].meanings[1]?.definitions[0]?.definition,
        useData[0].meanings[1]?.definitions[1]?.definition,
        useData[0].meanings[1]?.definitions[2]?.definition
    ])
} 

    function handleAdj(){
    setNoun(false)
    setVerb(false)
    setAdj(true)
    setNum(2)
    setDef([
        useData[0].meanings[2]?.definitions[0]?.definition,
        useData[0].meanings[2]?.definitions[1]?.definition,
        useData[0].meanings[2]?.definitions[2]?.definition
    ])
} 

    function handleAudio(){
        audioRef.current.currentTime = 0
        audioRef.current.play()
    }
    return (
        !useErr? <section className="result-section">
            <header>
                <div className="controls">

        <Link to="/">
            <img src={backArrow}
            onClick={()=> setErr(false)}
            alt="back to home" className="back-button"/>
        </Link>

             <SearchBar 
             setMainS={setMain}
             setPhoS={setPho}
             setPossS={setPoss}
             setDefS={setDef}
             setLinkS={setLink}
             setDataS={setData}
             setVoiceS={setVoice}
             setErrS={setErr}
             useErrS={useErr}
             setRecentS={setRecent}
             useRecentS={useRecent}
             setLoadS={setLoad}
             useLoadS={useLoad}
             useDataS={useData}
             />

                </div>

            </header>
            {useLoad && <h1 className="load">Loading Definition...</h1>}
            <div className={useLoad? "none" : "body"}>
            
                 <div className="word-and-speaker">
                <h1 className="word">{useMainWord}</h1>

                <img 
                src={speaker}
                onClick={handleAudio}
                alt="listen to audio of searched word" />
            </div>

            <p className="pronunciation">
            {usePhonetic}
            </p>

            <div className="parts-of-speech">
                {usePos.map((pos, i)=>{
                    if(pos == undefined || pos == ""){
                        return
                    }
                    else if(i == 0){
                        return <p 
                        key={pos + "f"} 
                        className={noun? "first active" : "first"}
                        onClick={handleNoun}
                        >{pos}</p>
                    }else if(i == 1){
                        return <p 
                        key={pos + "s"}
                         className={verb?"second active" : "second"}
                         onClick={handleVerb}
                         >{pos}</p>
                    }else{
                        return <p 
                        key={pos + "t"} 
                        className={adj? "third active" : "third"}
                        onClick={handleAdj}
                        >{pos}</p>
                    }
                    
                })}
            </div>

            <div className="descriptions">
                {
                    useDef.map((item, i)=>{
                        if (i == 0) {
                            return <p 
                            key={i} 
                            className="first"
                            >1. {item}
                                </p>
                        }
                        else if(i == 1){
                            return <p
                            key={i} 
                            className="second">
                               {useData[0].meanings[num].definitions.length >= 2&& 2.} {item}
                                </p>
                        }
                        else{
                            return <p key={i} className="third">
                                {useData[0].meanings[num].definitions.length >= 3&& 3.} {item}
                                </p> 
                        }
                       
                    })
                }
            </div>

            <p className="external-link">
                Read More: <a href={useLink} target="_blank">
                {useLink}
                </a>
            </p>
            </div>

           <audio src={useVoice} ref={audioRef}></audio>
           
       </section> :  <section className="result-section">
       <header>
                <div className="controls">

        <Link to="/">
            <img src={backArrow} alt="back to home" className="back-button"/>
        </Link>

             <SearchBar 
             setMainS={setMain}
             setPhoS={setPho}
             setPossS={setPoss}
             setDefS={setDef}
             setLinkS={setLink}
             setDataS={setData}
             setVoiceS={setVoice}
             setErrS={setErr}
             useErrS={useErr}
             setLoadS={setLoad}
             useLoadS={useLoad}
             />

                </div>

            </header>

            <div className="body">
              <h1 className="err">Sorry pal, we couldn't find definitions for the word you were looking for.</h1>
              <h2 className="res">Resolution: You can try the search again at later time or head to the web instead.
            Or you can check your internet connection and try again.</h2>
            </div>
             </section>) ;
}

export default Result;