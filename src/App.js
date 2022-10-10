import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AddExam from "./pages/AddExam";
import Dashboard from "./pages/Dashboard";
import AddQuestion from "./pages/AddQuestion";
import Users from "./pages/Users";
import Login from "./pages/Login";
import ManageUsers from "./pages/ManageUsers";
import ViewUser from "./pages/ViewUser";
import ViewQuestion from "./pages/ViewQuestion";
import LogOut from "./pages/LogOut";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/add-question"} element={<AddQuestion />} />
        <Route path={"/view-question/:id/"} element={<ViewQuestion />} />
        <Route path={"/users"} element={<Users />} />
        <Route path={"/view-user/:id/:name"} element={<ViewUser />} />
        <Route path={"/manage-users"} element={<ManageUsers />} />
        <Route path={"/add-exam"} element={<AddExam />} />
        <Route path={"/log-out"} element={<LogOut />} />
      </Routes>
    </Router>
  );
}

export default App;
