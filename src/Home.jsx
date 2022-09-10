import remove from "./assets/x.svg"
import SearchBar from "./SearchBar";

function Home({setMain, setPho, setPoss, setDef, setLink, setData, setVoice, setErr, useErr, setRecent, useRecent, useLoad, setLoad, useData}) {

   function handleRemove(word){
    const newArr = useRecent.filter((item)=> item !== word)
    setRecent(newArr)
   }

   const words = useRecent.map((word)=>{
    return( 
        <div key={word}>

        <p>{word}</p>

         <img 
         onClick={()=>handleRemove(word)}
         src={remove}
          alt=""
           />

         </div>
    ) 
   })

    return ( 
        <section className="home-section">
            <div className="heading">
                <h1>Dictionary</h1>
                <p>get definition to words</p>
            </div>

            <SearchBar 
            setMainS={setMain}
            setPhoS={setPho}
            setPossS={setPoss}
            setDefS={setDef}
            setLinkS={setLink}
            setDataS={setData}
            setVoiceS={setVoice}
            setErrS={setErr}
            setRecentS={setRecent}
            useRecentS={useRecent}
            setLoadS={setLoad}
            useLoadS={useLoad}
            useDataS={useData}
            />

            {useErr && 
            <>
            <h1 className="err">Sorry pal, we couldn't find definitions for the word you were looking for.</h1>
            <h2 className="res">Resolution: You can try the search again at later time or head to the web instead.
            Or you can check your internet connection and try again. </h2>
            </>}

            {useLoad && <h1 className="load">Loading Definition...</h1>}

            <h2>Recent Words</h2>
           {useRecent.length > 0 ? 
           <div className="recent"> 
            {words}
           </div> : <p className="recent-word">No Recent Words...</p>}

          
                    
        </section>
     );
}

export default Home;