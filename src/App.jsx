import { useState, useEffect } from 'react'
import s from './App.module.css'
import { api } from '../api/api'
import { Card } from '../components/card'

function App() {
  const [data, setData] = useState([])
  const [searchName, setsearchName] = useState("")
  const [searchPage, setsearchPage] = useState("")

  useEffect(() =>{
    api.get(`/characters/?name=${searchName}&page=${searchPage}`).then((response) => {
      setData(response.data.item)
    }).catch((error) => {
      console.error("ERRO AO PROCURAR API", error)
    })
  }, [searchName, searchPage])


  return(
    <>

    <h1 className={s.title}>Dragon Ball API</h1>
    <main>
      <div className={s.input}>
      <input type="text" value={searchName} onChange={(e) => setsearchName(e.target.value)} placeholder={'1/45'}/>
      <input type="text" value={searchPage} onChange={(e) => setsearchPage(e.target.value)} placeholder={'Procure um Personagem'}/>
      </div>
      <div className={s.wrapCard}>
        {data.map ((item, index) => {
          return(
            <div key={index}>
              <Card image={item.image} name={item.name} ki={item.ki} race={item.race}/>
            </div>
          )
        }

        )}

      </div>
    </main>
    </>
  )
  }


export default App