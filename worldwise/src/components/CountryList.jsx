import styles from "./CountryList.module.css";
import Message from "../components/Message";
import CountryItem from "../components/CountryItem";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { cities } = useCities();
  const countriesList = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);
  if (countriesList.length === 0)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <ul className={styles.countryList}>
      {countriesList.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
