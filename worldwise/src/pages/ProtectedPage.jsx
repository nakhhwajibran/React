import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/LoginContext";
import { useEffect } from "react";

function ProtectedPage({ children }) {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuth) return navigate("/login");
    },
    [isAuth, navigate]
  );

  useEffect(function () {
    if (!isAuth) return navigate("/login");
  }, []);

  return children;
}

export default ProtectedPage;
