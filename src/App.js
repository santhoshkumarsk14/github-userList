import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [user, setUser] = useState([]);

  async function fetchUsers() {
    try {
      const response = await fetch("https://api.github.com/users");
      console.log("Response: ", response);
      const result = await response.json();
      console.log("result: ", result);
      setUser(result); // Assuming the API returns an array
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  // Using useEffect to run fetchUsers once after the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>GitHub Users</h1>
      <ul>
        {user.map((users, index) => {
          const { id, login, avatar_url, html_url } = users; // Destructuring to get id and login
          return (
            <li key={id}>
              <img src={avatar_url} alt={id} className="image" />
              <p className="userName">{login}</p>{" "}
              {/* Displaying the 'login' of the user */}
              <a href={html_url} target="_blank" className="profile_btn">
                Profile
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
