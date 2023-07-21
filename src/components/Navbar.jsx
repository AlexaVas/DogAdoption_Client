/** @format */
import { useContext } from "react"; 
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  if (!user) {
    return (
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              {" "}
              <button>Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
            <Link to="/shelter">
              {" "}
              <button>Shelter</button>{" "}
            </Link>
          </>
        )}
      </nav>
    );
  }

  if (user.userType === "shelter") {
    return (
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>

        {/*    UPDATE     */}
        {isLoggedIn && (
          <>
            <Link to="/shelter/profile">
              <button>Profile</button>
            </Link>

            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup">
              {" "}
              <button>Sign Up</button>{" "}
            </Link>
            <Link to="/login">
              {" "}
              <button>Login</button>{" "}
            </Link>
            <Link to="/shelter">
              {" "}
              <button>Shelter</button>{" "}
            </Link>
          </>
        )}
      </nav>
    );
  } else {
    return (
      <nav>
        <Link to="/">
          <button>Home</button>
        </Link>

        {isLoggedIn && (
          <>
            <Link to="/projects">
              <button>Favorites</button>
            </Link>

            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </>
        )}

      </nav>
    );
  }
}

export default Navbar;
