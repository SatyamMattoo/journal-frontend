// App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Archives from "./pages/Archives";
import EditorialBoard from "./pages/EditorialBoard";
import Submission from "./pages/Submission";
import TrackPaper from "./pages/TrackPaper";

import AdminLayout from "./pages/admin/Layout";
import UnassignedArticles from "./pages/admin/UnassignedArticles";
import Announcements from "./pages/admin/Announcement";
import Editors from "./pages/admin/Editors";
import PublishedArticles from "./pages/admin/ReviewedArticles";

import AuthRoutes from "./protectedRoute/AuthRoutes";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { useGetUserDetailsQuery } from "./store/api/authApi";
import { setUser } from "./store/state/auth";

import VolumeArticles from "./pages/VolumeArticles";
import ForgotPassword from "./pages/ForgotPassword";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./components/Not-found";
import Error from "./components/Error";
import EditorLayout from "./pages/editor/Layout";
import AssignedArticles from "./pages/editor/AssignedArticles";
import PreviousArticles from "./pages/editor/PreviousArticles";
import UnderreviewArticles from "./pages/admin/UnderreviewArticles";

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

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="" element={<Home />} />
        <Route exact path="/archives" element={<Archives />} />
        <Route exact path="/editorialboard" element={<EditorialBoard />} />
        <Route
          exact
          path="/articles/volume/:volumeNumber/:issueNumber"
          element={<VolumeArticles />}
        />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        f
        <Route
          path="/submission"
          element={<ProtectedRoute element={<Submission />} />}
        />
        <Route
          path="/track"
          element={<ProtectedRoute element={<TrackPaper />} />}
        />
        {/* Admin */}
        <Route
          path="/admin/*"
          element={<AuthRoutes role="admin" element={<AdminLayout />} />}
        >
          <Route
            path="unassigned-articles"
            element={
              <AuthRoutes role="admin" element={<UnassignedArticles />} />
            }
          />
          <Route
            path="underreview-articles"
            element={
              <AuthRoutes role="admin" element={<UnderreviewArticles />} />
            }
          />
          <Route
            path="reviewed-articles"
            element={
              <AuthRoutes role="admin" element={<PublishedArticles />} />
            }
          />
          <Route
            path="reviewer"
            element={<AuthRoutes role="admin" element={<Editors />} />}
          />
          <Route
            path="announcements"
            element={<AuthRoutes role="admin" element={<Announcements />} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/error"
          element={
            <Error error={{ message: "An unexpected error occurred." }} />
          }
        />
        {/* Editor */}
        <Route
          path="/editor/*"
          element={<AuthRoutes role={"editor"} element={<EditorLayout />} />}
        >
          <Route
            path="assigned-articles"
            element={
              <AuthRoutes role="editor" element={<AssignedArticles />} />
            }
          />
          <Route
            path="previous-articles"
            element={
              <AuthRoutes role="editor" element={<PreviousArticles />} />
            }
          />
        </Route>
      </Routes>
      <Toaster />
      <Footer />
    </Router>
  );
}

export default App;
