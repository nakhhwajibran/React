import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/LoginContext";
import Button from "../components/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES

  const { email, password, setEmail, setPassword, login, isAuth, setIsAuth } =
    useAuth();
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();
    login();
  }

  useEffect(
    function () {
      if (isAuth) navigate("/app", { replace: true });
    },
    [isAuth, navigate]
  );

  useEffect(function () {
    const auth = localStorage.getItem("isAuth");

    if (auth !== null) {
      setIsAuth(true);
    }
  }, []);
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClickFnc={(e) => handleLogin(e)}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
