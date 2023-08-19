import { useState, useEffect, useRef } from 'react'
import '../styles/Map.css'
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import CourtCard from './CourtCard';
import Form from './Form';

const containerStyle = {
  width: '100%',
  height: '100%',
};

function Map() {
  const [courts, setCourts] = useState([])
  const [markers, setMarkers] = useState([])
  const [location, setLocation] = useState({})
  const [radius, setRadius] = useState(10)
  const [clickedCourt, setClickedCourt] = useState(null)
  const [clickedCourtKey, setClickedCourtKey] = useState(0)
  const formRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=>{
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      setMarkers([{
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }])
    }, ()=>alert("Unable to find current location!"));
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/courts/all?lat=${location.lat}&lng=${location.lng}&radius=${radius * 1000}`)
    const nearbyCourts = await response.json()
    const markerList = nearbyCourts.map((court)=>{
      return {
        lat: court.latitude,
        lng: court.longitude
      }
    })
    setCourts(nearbyCourts)
    setMarkers([{
      lat: location.lat,
      lng: location.lng
    }, ...markerList])
  }

  function getInfo(placeId) {
    setClickedCourtKey(clickedCourtKey + 1)
    setClickedCourt(placeId)
    formRef.current.scrollIntoView()
  }

  return (
    <>
      <div className='mapContainer'>
        <div className='results'>
          <div className='controls'>
            <div className="radiusInput">
              <label for="radius">Radius in kilometers: </label>
              <input name="radius" type="number" min="10" max="50" value={radius} onChange={(e)=>setRadius(e.target.value)} />
            </div>
            <button onClick={handleSearch}>Find nearby courts</button>
          </div>
          <div className='courts'>
            {courts.map((court)=><CourtCard court={court} getInfo={getInfo}/>)}
          </div>
        </div>
        <div className='map'>
          <LoadScript googleMapsApiKey="AIzaSyCdrjOhFuCrbGgfar0CpYTaQccTw1YuDX8">
            <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={10}>
              {markers.map((marker, index) => (
                <Marker key={index} position={marker} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
      <div ref={formRef} className='formContainer'>
        <Form courtKey={clickedCourtKey} placeId={clickedCourt} getInfo={getInfo} />
      </div>
    </>
  )
}

export default Map
