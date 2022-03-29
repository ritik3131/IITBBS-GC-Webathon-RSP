import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initailState = { user: null };

if (localStorage.getItem("jwtToken")) {
  const decodeToken = jwtDecode(localStorage.getItem("jwtToken"));
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initailState.user = decodeToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initailState);

  const login = (data) => {
    localStorage.setItem("jwtToken", data.token);
    const decodeToken = jwtDecode(data.token);
    dispatch({ type: "LOGIN", payload: decodeToken });
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };