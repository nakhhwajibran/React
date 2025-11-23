export default function Button({ onClickFnc, children }) {
  return (
    <button className="button" onClick={onClickFnc}>
      {children}
    </button>
  );
}
