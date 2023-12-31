/** @format */

import "./App.css";
import { Routes, Route} from "react-router-dom"; // <== IMPORT
// import ProjectListPage from "./pages/ProjectListPage";
// import ProjectDetailsPage from "./pages/ProjectDetailsPage";
// import EditProjectPage from "./pages/EditProjectPage";
import Navbar from "./components/Navbar"; // <== IMPORT
import HomePage from "./pages/HomePage"; // <== IMPORT
import SignupPage from "./pages/SignupPage";
import SignUpLogInShelter from "./pages/sl_shelter";
import NewListing from "./pages/NewListingPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import ShelterProfile from "./pages/ShelterProfile";
import EditDogPage from "./pages/EditDogPage";
import ViewPage from "./pages/ViewPage";
import FavoritesPage from "./pages/FavoritesPage";
import MissionPage from "./pages/MissionPage";
import LearningCenter from "./pages/LearningCenter";


function App() {
  return (
    <div className="App">
      {/* Below: ADD <Navbar>, <Routes> & <Route> */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />

        <Route
          path="/shelter"
          element={
            <IsAnon>
              {" "}
              <SignUpLogInShelter />{" "}
            </IsAnon>
          }
        />

        <Route
          path="/shelter/listing"
          element={
            <IsPrivate>
              {" "}
              <NewListing />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/shelter/profile"
          element={
            <IsPrivate>
              {" "}
              <ShelterProfile />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/profile/edit/:dogId"
          element={
            <IsPrivate>
              {" "}
              <EditDogPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/view/:dogId"
          element={
            <IsPrivate>
              {" "}
              <ViewPage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/user/favorites"
          element={
            <IsPrivate>
              {" "}
              <FavoritesPage />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/learning"
          element={
            <IsAnon>
              {" "}
              <LearningCenter />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/mission"
          element={
            <IsAnon>
              {" "}
              <MissionPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="*"
          element={
            <IsAnon>
              {" "}
              <HomePage />{" "}
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
