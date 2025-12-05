import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
const user = {
  name: "Jibran",
  email: "nakhwa.jibrann@gmail.com",
  password: "Farzana@1611",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);

  function login() {
    if (email !== user.email || password !== user.password) {
      setIsAuth(false);
      return;
    }
    setIsAuth(true);
    localStorage.setItem("isAuth", true);
  }

  function logout() {
    setIsAuth(false);
    localStorage.removeItem("isAuth");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        login,
        email,
        password,
        setPassword,
        setEmail,
        setIsAuth,
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Calling useLogin out of the provider");
  return context;
}

export { AuthProvider, useAuth };
