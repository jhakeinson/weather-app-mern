import React, { useCallback, useState } from "react";
import { ErrorCard } from "./components/ErrorCard";
import { SearchForm } from "./components/SearchForm";
import { WeatherCard } from "./components/WeatherCard";

function App() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [forecast, setForecast] = useState({
    rainChance: "",
    airTemperature: "",
    windSpeed: "",
    areaName: "",
    time: "",
    weatherIcon: "",
  });

  const handleResetOnClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setError(false);
      setSuccess(false);
      setErrorMessage("");
      setQuery("");
    },
    []
  );

  const handleSearchFormOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      console.log("hi ", query);
    },
    [query]
  );

  const handleSearchFormOnSubmit = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      let error = false;
      let success = false;
      if (!query) {
          setError(true);
          setSuccess(false);
          setErrorMessage("Please type something for me to work on.");
          return;
      }

      fetch(`http://localhost:3001/api?location=${query}`)
        .then((res) => {
          if (res.status === 404 || res.status >= 500) {
            console.log("Not found");
            error = true;
            return res.text();
          }

          if (res.status === 200) {
            return res.json();
          }

          return null;
        })
        .then((res) => {
          console.log(res);
          if (res === null) {
            return;
          }

          if (error) {
            console.log("Test");
            setErrorMessage(res);
          } else {
            const time = new Date().toLocaleTimeString();
            setForecast({
              airTemperature: `${res.airTemperature.value} ${res.airTemperature.unit}`,
              rainChance: `${res.humidity.value}${res.humidity.unit}`,
              windSpeed: `${res.windSpeed.value}${res.windSpeed.unit}`,
              areaName: res.areaName,
              time: time,
              weatherIcon: `${res.forecastSummary}.svg`,
            });

            error = false;
            success = true;
          }
          setSuccess(success);
          setError(error);
        });
    },
    [query]
  );

  return (
    <div className="flex items-center justify-center h-screen">
      {!error && !success ? (
        <SearchForm
          queryInput={query}
          onSubmit={handleSearchFormOnSubmit}
          onChange={handleSearchFormOnChange}
        />
      ) : success && !error ? (
        <div className="flex justify-center flex-col items-center">
          <WeatherCard context={forecast} />
          <div className="mt-3">
            <button
              onClick={handleResetOnClick}
              type="button"
              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Go back
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center flex-col items-center">
          <ErrorCard errorMessage={errorMessage} />
          <div className="mt-3">
            <button
              onClick={handleResetOnClick}
              type="button"
              className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
