import { useState } from 'react';
import './App.css';

// Enter char name

// Fetch char from Api

// Save it in state

// Display the details in card

function App() {

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState({});

  const searchChar = async () => {
    if(!query) return
    
    setLoading(true)
    try{
      const res = await fetch('https://narutodb.xyz/api/character/search?name='+query);

      const data = await res?.json();

      // console.log(data)
      setBio(data)

    }catch(e) {
      console.error(e);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="App container">
      <h1>Naruto Fandom</h1>
      <input
        type="search"
        name="search"
        placeholder="Search"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchChar} disabled={loading} aria-busy={loading ? "true" : "false"}>Search</button>
      
      {loading ? <progress /> : ''}
      {bio?.name?.length > 0 ?
        <article style={{background:"rgba(0,0,0,0.5)", width:"80%", margin: "20px auto"}}>
          <p>{bio?.name}</p> 
          <img src={bio?.images[0]} alt={bio?.name} />

          <p>Clan: 
            {!Array.isArray(bio?.personal?.clan) ? <span> {bio?.personal?.clan}</span> 
            : bio?.personal?.clan?.map((c, idx) => <span key={idx}> {c}</span>)}
          </p>

          {bio?.personal?.birthdate?.length > 0 ?
          <p>Birth Date: {bio?.personal?.birthdate}</p>
          : "" }

          {bio?.personal?.sex?.length > 0 ?
          <p>Gender: {bio?.personal?.sex}</p>
          : "" }

          {bio?.personal?.bloodType?.length > 0 ?
          <p>Blood Type: {bio?.personal?.bloodType}</p>
          : "" }

          {bio?.personal?.occupation?.length > 0 ?
          <div>
          <h2>Occupation:</h2>
          {!Array.isArray(bio?.personal?.occupation) ? <li>{bio?.personal?.occupation}</li> 
          : bio?.personal?.occupation?.map((o, idx) => <li key={idx}>{o}</li>)}
          <br/>
          </div> 
          : ""}

      {bio?.personal?.affiliation?.length > 0 ?
        <div>
          <h2>Affiliation:</h2>
          
          {!Array.isArray(bio?.personal?.affiliation) ? <li>{bio?.personal?.affiliation}</li>
          : bio?.personal?.affiliation?.map((a, idx) => <li key={idx}>{a}</li>)}
          
          <br/>
          </div>
          : ""}

        {bio?.personal?.team?.length > 0 ?
        <div>
          <h2>Team:</h2>
          {!Array.isArray(bio?.personal?.team) ? <li>{bio?.personal?.team}</li>
          : bio?.personal?.team?.map((o, idx) => <li key={idx}>{o}</li>)}
        <br/>
          </div> 
        : ""}

        {bio?.natureType?.length > 0 ?
          <div>
          <h2>Chakra Types</h2>
         
            {bio?.natureType?.map((natureType, idx) => <li key={idx}>{natureType}</li>)}
            <br/>
          </div> 
          : ""}

          <div>
          <h2>Jutsu</h2>
            {bio?.jutsu?.map((jutsu, idx) => <li key={idx}>{jutsu}</li>)}
          </div>
        </article>

      : ''}
    </div>
  );
}

export default App;
