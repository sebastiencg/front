import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Jwt from "../jwt/Jwt.tsx";
type user = {
  id: number;
  username: string;
};
export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  const [currentUser, setCurrentUser] = useState<user | null>();

  function readLocalStorage() {
    const storedData: string | null = localStorage.getItem('user');
    const user = storedData ? JSON.parse(storedData) : null;
    setCurrentUser(user);
  }

  useEffect(() => {
    async function findToken() {
      const token = await Jwt();
      if (!token) {
        if (currentUrl!=="/register"){
          navigate("/login");
        }

      }
    }

    findToken()
    readLocalStorage();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Your App</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              {currentUser ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Logout</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
