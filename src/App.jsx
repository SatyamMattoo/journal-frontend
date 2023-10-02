import { useDispatch } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Home from "./pages/Home";
import Archives from "./pages/Archives";
import EditorialBorad from "./pages/EditorialBorad";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Submission from "./pages/Submission";
import TrackPaper from "./pages/TrackPaper";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import EditorDashboard from "./pages/EditorDashboard";
import VolumeArticles from "./pages/VolumeArticles";
import ForgotPassword from "./pages/ForgotPassword";
import { useEffect } from "react";
import { useGetUserDetailsQuery } from "./store/api/authApi";
import { setUser } from "./store/state/auth";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AuthRoutes from "./protectedRoute/AuthRoutes";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const dispatch = useDispatch();

  const { data, isError, isLoading } = useGetUserDetailsQuery();
  useEffect(() => {
    if (!isLoading && !isError && data) {
      const { name, role } = data.user;

      // Dispatch the user details to Redux store
      dispatch(
        setUser({
          name,
          role,
        })
      );
    }
  }, [dispatch, data, isLoading, isError]);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="" element={<Home />} />
          <Route exact path="/archives" element={<Archives />} />
          <Route exact path="/editorialboard" element={<EditorialBorad />} />
          <Route
            exact
            path="/articles/volume/:volumeNumber/:issueNumber"
            element={<VolumeArticles />}
          />
          <Route exact path="/register" element={<Register />} />
          {<Route exact path="/login" element={<Login />} />}
          <Route exact path="/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />

          <Route
            path="/submission"
            element={<ProtectedRoute element={<Submission />} />}
          />
          <Route
            path="/track"
            element={<ProtectedRoute element={<TrackPaper />} />}
          />
          <Route
            path="/admin"
            element={<AuthRoutes element={<AdminDashboard />} role="admin" />}
          />
          <Route
            path="/editor"
            element={<AuthRoutes element={<EditorDashboard />} role="editor" />}
          />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
}

export default App;
