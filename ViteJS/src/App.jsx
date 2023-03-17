import React, { useState } from "react"

export default function App() {
  const [userData, setUserData] = useState({})

  const handleChange = (event) => {
    setUserData({...userData, [event.target.name] : event.target.value.trim()})
  }

  const handleSubmit = async (event) => {
    console.log(userData)
    const value = await fetch('http://localhost:8080/api', {
        method: 'POST',
        body: JSON.stringify(userData)
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
 
    event.preventDefault()
    console.log(value);
  }

  return (
    <>
      <label>
        Username
        <input name="username" onChange={handleChange} />
      </label>
      <br />
      <label>
        Password
        <input name="password" onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}