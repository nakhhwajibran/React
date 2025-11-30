import { useEffect } from "react";

export function useKey(key, callbackFnc) {
  useEffect(
    function () {
      function callBack(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          callbackFnc();
        }
      }

      document.addEventListener("keydown", callBack);

      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [callbackFnc, key]
  );
}
