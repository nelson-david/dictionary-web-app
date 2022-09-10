import { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import search from "./assets/search.svg"

function SearchBar({setMainS, setPhoS, setPossS, setDefS, setLinkS, setDataS, setVoiceS, setErrS , setRecentS, setLoadS}) {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()
    const inputRef = useRef()

    function handleFetch(word){
        if (word.trim().length == 0) {
           return alert("please enter a word")
        }
        setLoadS(true)
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((raw)=> raw.json())
        .then((data)=> {
            if (data.title) {
                setLoadS(false)
              return  setErrS(true)
            }
            localStorage.setItem("s", JSON.stringify(data[0]))
            setDataS(data) 
            setMainS(data[0].word)
            setPhoS(data[0].phonetic && data[0].phonetic) 
            setVoiceS(data[0].phonetics[0]?.audio)
            
            setPossS(
                [data[0].meanings[0].partOfSpeech,
                 data[0].meanings[1]?.partOfSpeech,
                 data[0].meanings[2]?.partOfSpeech
                ])
            setDefS([
                data[0].meanings[0].definitions[0].definition,
                data[0].meanings[0].definitions[1]?.definition,
                data[0].meanings[0].definitions[2]?.definition
            ])
            setLinkS(data[0].sourceUrls)
            setErrS(false)
                setLoadS(false)
            navigate("/result")
            setRecentS((prev)=>{
                const oldArr = [...prev]
                if (oldArr.includes(data[0].word)) {
                    return oldArr
                }else{
                    const newArr = [...prev, data[0].word]
                return newArr
                }
                })
                setSearchValue("")
                inputRef.current.blur()
        })
       }

       useEffect(()=>{
        window.addEventListener("beforeunload", getWord)

        return ()=>{
            window.removeEventListener("beforeunload", getWord)
        }
       }, [])

       function getWord(e){
        if (window.location.pathname != "/result") {
            return
        }
        e.preventDefault()
        handleFetch(
            JSON.parse(localStorage.getItem("s")).word
        )
        }
       

    return ( 
        <div className="search">
        <form
        onSubmit={(e)=>{
            e.preventDefault()
            handleFetch(searchValue)
        }}
        >
            <input
             type="text"
             ref={inputRef}
             value={searchValue}
             onChange={(e)=>setSearchValue(e.target.value)}
              placeholder="Search for a word..."
              />
        </form>

        <img 
        src={search}
        onClick={()=>handleFetch(searchValue)}
        alt="search for a word"
        className="search-mag"
         />
        
    </div>
     );
}

export default SearchBar;