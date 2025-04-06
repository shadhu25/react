import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
// import { About } from "./components/About";
import { Navbar } from "./components/Navbar";
import { NoMatch } from "./components/NoMatch";
import { Products } from "./components/Products";
import { Featured } from "./components/Featured";
import { New } from "./components/New";
import { UserDetails } from "./components/UserDetails";
import { User } from "./components/User";
import { UserAdmin } from "./components/UserAdmin";
import { AuthProvider } from "./utils/authContext";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
const LazyAbout = React.lazy(() => import("./components/About"));

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="about"
          element={
            <React.Suspense fallback="Loading....">
              <LazyAbout />
            </React.Suspense>
          }
        />
        <Route path="products" element={<Products />}>
          <Route index element={<Featured />} />
          <Route path="featured" element={<Featured />} />
          <Route path="new" element={<New />} />
        </Route>
        <Route path="users" element={<User />}>
          <Route path=":userId" element={<UserDetails />} />
          <Route path="admin" element={<UserAdmin />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
        <Route
          path="profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
