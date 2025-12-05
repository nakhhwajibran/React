import { useSearchParams } from "react-router-dom";
function useUrlPosition() {
  const [search] = useSearchParams();
  const mapLat = search.get("lat");
  const mapLong = search.get("long");

  return { mapLat, mapLong };
}

export { useUrlPosition };
