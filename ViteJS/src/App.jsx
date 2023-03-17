import React, { useState } from "react"

export default function App() {
  const [userData, setUserData] = useState({})

  const handleChange = (event) => {
    setUserData({...userData, [event.target.name] : event.target.value.trim()})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const value = await fetch('http://localhost:8080/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }).then(function(response) {
        return response.json();
      });
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
      <label>
        Email
        <input name="email" onChange={handleChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}