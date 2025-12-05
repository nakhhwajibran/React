// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect } from "react";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { mapLat, mapLong } = useUrlPosition();
  const { addCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [isLoadingGeoLocationCity, setIsLoadingGeoLocationCity] =
    useState(false);

  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  useEffect(
    function () {
      if (!mapLat || !mapLong) return;
      async function fetchCityName() {
        try {
          setIsLoadingGeoLocationCity(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${mapLat}&longitude=${mapLong}`
          );
          const data = await res.json();

          if (!data.countryCode)
            throw new Error(
              `Doesn't seem to be a city, Click somewhere else...!!!`
            );
          setCityName(data.city ? data.city : data.locality);
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          setGeoCodingError("");
        } catch (err) {
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeoLocationCity(false);
        }
      }

      fetchCityName();
    },
    [mapLat, mapLong]
  );

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat: mapLat, lng: mapLong },
    };

    await addCity(newCity);
    navigate("/app/cities");
  }

  if (isLoadingGeoLocationCity) return <Spinner />;
  if (geoCodingError) return <Message message={geoCodingError} />;

  if (!mapLat || !mapLong)
    return <Message message={"Starting by clicking on the map"} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={(e) => handleFormSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <ButtonBack></ButtonBack>
      </div>
    </form>
  );
}

export default Form;
