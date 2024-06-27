import "./App.css";
import Routing from "./components/Routing/Routing";
import Navbar from "./components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const jwtUser = jwtDecode(jwt);
      if (Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      } else {
        setUser(jwtUser);
      }
    } catch (err) {}
  }, []);

  return (
    <div className="app">
      <Navbar user={user} />
      <main>
        <Routing />
      </main>
    </div>
  );
}

export default App;
