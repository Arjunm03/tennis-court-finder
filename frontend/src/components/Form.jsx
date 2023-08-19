import { useState, useEffect } from 'react'
import '../styles/Form.css'

function Form(props) {
  const [name, setName] = useState("N/A")
  const [type, setType] = useState("unknown")
  const [condition, setCondition] = useState("unknown")
  const [hard, setHard] = useState(false)
  const [clay, setClay] = useState(false)
  const [grass, setGrass] = useState(false)
  const [carpet, setCarpet] = useState(false)
  const [outdoor, setOutdoor] = useState(false)
  const [indoor, setIndoor] = useState(false)
  const [lights, setLights] = useState(false)
  const [bathroom, setBathroom] = useState(false)
  const [free, setFree] = useState(false)
  const [proShop, setProShop] = useState(false)
  const [backboard, setBackboard] = useState(false)
  const [water, setWater] = useState(false)
  const [courts, setCourts] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()
    const data = {
      type,
      condition,
      hard,
      clay,
      grass,
      carpet,
      outdoor,
      indoor,
      lights,
      bathroom,
      free,
      proShop,
      backboard,
      water,
      courts
    }
    const response = await fetch(`http://localhost:4000/api/courts?placeId=${props.placeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)})
    const res = await response.json()
    alert("Update submitted!")
  }

  function handleReset(e) {
    e.preventDefault()
    props.getInfo(props.placeId)
  }

  useEffect(() => {
    if (!props.placeId) {
      return
    }
    async function getCourt() {
      const response = await fetch(`http://localhost:4000/api/courts?placeId=${props.placeId}`)
      const court = await response.json()
      setName(court.name)
      setType(court.type)
      setCondition(court.condition)
      setHard(court.hard)
      setClay(court.clay)
      setGrass(court.grass)
      setCarpet(court.carpet)
      setOutdoor(court.outdoor)
      setIndoor(court.indoor)
      setLights(court.lights)
      setBathroom(court.bathroom)
      setFree(court.free)
      setProShop(court.proShop)
      setBackboard(court.backboard)
      setWater(court.water)
      setCourts(court.courts)
    }
    getCourt()
  }, [props.courtKey]);

  return (
    <>
      <form onSubmit={handleSubmit} className='form'>
        <label>Name: {name}</label>
        <label>
          Type:
          <select value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="club">Club</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <label>
          Condition:
          <select value={condition} onChange={(e)=>setCondition(e.target.value)}>
            <option value="unplayable">Unplayable</option>
            <option value="bad">Bad</option>
            <option value="average">Average</option>
            <option value="great">Great</option>
            <option value="excellent">Excellent</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <label>
          Hard:
          <input type="checkbox" checked={hard} onChange={()=>setHard(!hard)} />
        </label>
        <label>
          Clay:
          <input type="checkbox" checked={clay} onChange={()=>setClay(!clay)} />
        </label>
        <label>
          Grass:
          <input type="checkbox" checked={grass} onChange={()=>setGrass(!grass)} />
        </label>
        <label>
          Carpet:
          <input type="checkbox" checked={carpet} onChange={()=>setCarpet(!carpet)} />
        </label>
        <label>
          Outdoor:
          <input type="checkbox" checked={outdoor} onChange={()=>setOutdoor(!outdoor)} />
        </label>
        <label>
          Indoor:
          <input type="checkbox" checked={indoor} onChange={()=>setIndoor(!indoor)} />
        </label>
        <label>
          Lights:
          <input type="checkbox" checked={lights} onChange={()=>setLights(!lights)} />
        </label>
        <label>
          Bathroom:
          <input type="checkbox" checked={bathroom} onChange={()=>setBathroom(!bathroom)} />
        </label>
        <label>
          Free:
          <input type="checkbox" checked={free} onChange={()=>setFree(!free)} />
        </label>
        <label>
          ProShop:
          <input type="checkbox" checked={proShop} onChange={()=>setProShop(!proShop)} />
        </label>
        <label>
          Backboard:
          <input type="checkbox" checked={backboard} onChange={()=>setBackboard(!backboard)} />
        </label>
        <label>
          Water:
          <input type="checkbox" checked={water} onChange={()=>setWater(!water)} />
        </label>
        <label>
          Courts:
          <input type="number" value={courts} onChange={(e)=>setCourts(e.target.value)} />
        </label>
        <div className='formButtons'>
          <input type="button" value="Reset" onClick={handleReset} />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </>
  )


}

export default Form
