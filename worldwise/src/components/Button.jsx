import styles from "./Button.module.css";
function Button({ children, onClickFnc, type }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClickFnc}>
      {children}
    </button>
  );
}

export default Button;
