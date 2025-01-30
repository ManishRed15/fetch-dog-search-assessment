import { useState } from "react";
import Login from "./pages/Login";
import Search from "./pages/Search";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (name, email) => {
    console.log("User logged in:", name, email);
    setIsAuthenticated(true);
  };

  return (
    <div>
      {!isAuthenticated ? <Login onLogin={handleLogin} /> : <Search />}
    </div>
  );
}

export default App;
