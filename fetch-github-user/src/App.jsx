import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import loadingGif from "./Snake.gif";

function App() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("massoumeh");
  const [loading, setLoading] = useState(false);
  const userInputRef = useRef("");

  const endPoint = `https://api.github.com/users/${username}`;

  const handleSearch = () => {
    userInputRef.current.textContent !== "" &&
      setUsername(userInputRef.current.textContent);
  };
  const handleClear = () => {
    userInputRef.current.textContent = "";
    setUsername("massoumeh");
    userInputRef.current.focus();
  };

  function getUser() {
    setLoading(true);
    fetch(endPoint)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }
  useEffect(() => {
    getUser();
  }, [username]);

  return (
    <div className="App">
      <div className="searchSectionWrapper">
        <label htmlFor="user">Github Username:</label>
        <div
          id="user"
          contentEditable="true"
          style={{
            border: "2px solid gray",
            width: "300px",
            borderRadius: "10px",
            padding: "5px",
          }}
          ref={userInputRef}
        />
        <button
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            width: "100px",
            fontSize: "1rem",
          }}
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            fontSize: "1rem",
            color: "green",
            width: "100px",
          }}
          onClick={handleClear}
        >
          clear
        </button>
      </div>
      {!loading && user ? (
        <>
          <div
            style={{
              width: "200px",
              height: "200px",
              position: "absolute",
              top: "150px",
              textAlign: "center",
            }}
          >
            <p style={{ fontWeight: "bolder" }}>{user.name}</p>
            <img
              src={loadingGif}
              style={{
                position: "relative",
                top: "50%",
                right: "20%",
                zIndex: "-1",
              }}
              alt="loading gif"
            />

            <img
              style={{
                borderRadius: "50%",
                width: "200px",
                marginRight: "50px",
              }}
              alt="user Avatar"
              src={user.avatar_url}
            />
          </div>
        </>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}

export default App;
