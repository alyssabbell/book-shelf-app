import React, { useState, useContext } from 'react';
import './App.css';
import axios from "axios";
import { CookieContext } from "./contexts/SessionContext.js";
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ history }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasError, setHasError] = useState(false);
  const [uuid, setUUID] = useContext(CookieContext);


  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios("http://localhost:7000/signin/uuid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { username, password },
    })
      .then(response => {
        setUUID(response.data.uuid);
        history.push("/Bookshelf");
      })
      .catch(error => {
        setHasError(true);
        setErrorMessage(error.response.data.message);
      })
  };

  return (
    <div className="container mt-2 mb-5" id="stand-width">
      <form className="mb-2" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username" className="mr-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control mr-3"
            required={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control mr-3"
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-info" onClick={handleLogin}>
          Login
        </button>

      </form>
      {hasError && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default App;
