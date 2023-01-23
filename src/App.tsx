import { useEffect, useState } from "react";
import "./styles.css";

function getAutoCompleteResults(
  query: string,
  signal?: AbortSignal
): Promise<string[]> {
  const fruits = [
    "Apricots",
    "Artichokes",
    "Arugula",
    "Asparagus",
    "Avocados",
    "Basil",
    "Beets",
    "Black-eyed Peas",
    "Blood Oranges ",
    "Broccoli",
    "Carrots",
    "Cauliflower",
    "Chard ",
    "Cherries",
    "Corn",
    "Cucumber",
    "Eggplant",
    "Fava Beans",
    "Fennel",
    "Fiddleheads",
    "Garlic",
    "Figs",
    "Grapefruits",
    "Green Onions",
    "Kohlrabi",
    "Kumquats",
    "Medjool Dates",
    "Morels",
    "Mushrooms",
    "Navel Oranges",
    "Nectarines",
    "Nettles",
    "Lettuce",
    "Okra",
    "Parsley",
    "Passion Fruit",
    "Pea Beans",
    "Peaches",
    "Plums",
    "Potatoes",
    "Radish",
    "Raspberries",
    "Rhubarb",
    "Spinach ",
    "Spring Onions",
    "Strawberries",
    "Tomatoes",
    "Turnips"
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (signal?.aborted) {
        reject(signal.reason);
      }
      resolve(
        fruits.filter((fruit) =>
          fruit.toLowerCase().includes(query.toLowerCase())
        )
      );
    }, Math.random() * 1000);
  });
}

function useDebounceValue(value: string, time = 20) {
  const [debobunceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);
  return debobunceValue;
}
export default function App() {
  const [query, setQuery] = useState("");
  const [suggetions, setSuggetions] = useState<string[]>([]);
  const debounceQuery = useDebounceValue(query);

  useEffect(() => {
    let ignore = false;
    (async () => {
      setSuggetions([]);
      if (debounceQuery.length > 0) {
        const data = await getAutoCompleteResults(debounceQuery);
        if (!ignore) {
          setSuggetions(data);
        }
      }
    })();
    return () => {
      ignore = true;
    };
  }, [debounceQuery]);
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {suggetions.map((suggetion) => (
        <div key={suggetion}>{suggetion}</div>
      ))}
    </>
  );
}
