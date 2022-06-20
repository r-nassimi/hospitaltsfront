import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "src/components/Registration/Registration";
import Login from "src/components/Login/Login";
import './app.scss'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Redirect from empty adress to login form */}
        <Route path="/" element={<Navigate replace to = "/login"/>} />
      </Routes>
    </div>
  );
};

export default App;