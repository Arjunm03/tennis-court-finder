import '../styles/CourtCard.css'

function CourtCard(props) {
  let court = props.court
  let getInfo = props.getInfo

  function handleClick(e) {
    e.preventDefault()
    getInfo(court.placeId)
  }

  return (
    <>
      <div className="card">
        <div className="info">
          <p className='name'>{court.name}</p>
          <p className='address'>{court.address}</p>
          <p className='type'>Type: {court.type}</p>
          <p className='condition'>Condition: {court.condition}</p>
        </div>
        <button className='edit' onClick={handleClick}>View/Edit</button>
      </div>
    </>
  )
}

export default CourtCard
