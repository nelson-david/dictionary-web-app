import Home from "./Home"
import Result from "./Result"
import "../src/styles.css"
import { Route, Routes } from "react-router-dom"
import { useState } from "react"

function App() {
  const [mainWord, setMainWord] = useState("")
  const [phonetic, setPhonetic] = useState("")
  const [pos, setPos] = useState([])
  const [definition, setDefinition] = useState([])
  const [url, setUrl] = useState("")
  const [sound, setSound] = useState("")
  const [sentData, setSentData] = useState("default")
  const [errorMessage, setErrorMessage] = useState(false)
  const [recentWords, setRecentWords ] = useState([])
  const [loading, setLoading] = useState(false)


  function setMainWordFun(newMainWord){
    setMainWord(newMainWord)
  }

  function setPhoneticsFun(newPhonetic){
    setPhonetic(newPhonetic)
  }

  function setPosFun([a,b,c]){
    setPos([a,b,c])
  }

  function sefDefinitionFun([a,b,c]){
    setDefinition([a,b,c])
  }

  function setSoundFunc(newSound){
    setSound(newSound)
  }

  function setUrlFunc(newUrl){
    setUrl(newUrl)
  }

  function setSentDataFunc(d){
    setSentData(d)
  }

  function setErrorMessageFunc(err){
    setErrorMessage(err)
  }

  function setRecentWordsFunc(val){
    setRecentWords(val)
  }

  function setLoadingFunc(value){
    setLoading(value)
  }

  return (
    <main className="app">
      <Routes>
        <Route path="/" element={
        <Home 
        setMain={setMainWordFun}
        setPho={setPhoneticsFun}
        setPoss={setPosFun}
        setDef={sefDefinitionFun}
        setLink={setUrlFunc}
        setData={setSentDataFunc}
        setVoice={setSoundFunc}
        setErr={setErrorMessageFunc}
        setRecent={setRecentWordsFunc}
        setLoad={setLoadingFunc}
        useRecent={recentWords}
        useLoad={loading}
        useData={sentData}


        useErr={errorMessage}
        />} />


        <Route path="result" element={
        <Result 
        useMainWord={mainWord}
        usePhonetic={phonetic}
        usePos={pos}
        useDef={definition}
        useLink={url}
        setDef={sefDefinitionFun}
        useData={sentData}
        useVoice={sound}
        useErr={errorMessage}
        useRecent={recentWords}
        useLoad={loading}

        setMain={setMainWordFun}
        setRecent={setRecentWordsFunc}
        setPho={setPhoneticsFun}
        setPoss={setPosFun}
        setLink={setUrlFunc}
        setData={setSentDataFunc}
        setVoice={setSoundFunc}
        setErr={setErrorMessageFunc}
        setLoad={setLoadingFunc}
        />} />
      </Routes>
    </main>
  )
}

export default App