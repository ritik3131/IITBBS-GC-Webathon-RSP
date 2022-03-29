import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./App.css";
import MenuBar from "./component/menuBar";
import { AuthContext } from "./context/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";
import history from "./history";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router history={history}>
      <Container>
        <MenuBar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<PostDetails />} path="/posts/:postId" />
          <Route
            element={!user ? <Login /> : <Navigate to="/" />}
            path="/login"
          />
        </Routes>
      </Container>
    </Router>
    // </AuthProvider>
  );
}

export default App;
