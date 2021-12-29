import "./App.css";
import { useState } from "react";

const api = {
  base: "https://api.openweathermap.org/data/2.5/weather?",
  key: "14a8b440624900a2411b9935a3c900f6",
};
function App() {
  const [input, setinput] = useState("");
  const [weather, setweather] = useState({});

  const getDate = () => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date();
    const date = d.getDate();
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    const time = `${day}, ${date} ${month} ${year}`;
    // console.log(time);
    return time;
  };

  const name = (e) => {
    if (e.key === "Enter") {
      if (input === "") {
        alert("please enter the city");
        return;
      }
      fetch(`${api.base}q=${input}&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setweather(result);
          setinput("");
          console.log(result);
          document.getElementById("weather_cont").style.display = "block";
        })
        .catch((error) => {
          alert("city not found");
        });
    }
  };

  return (
    <>

      <div className="search_box">
        <input
          type="text"
          placeholder="Enter the city"
          className="search_bar"
          onChange={(e) => {
            setinput(e.target.value);
          }}
          value={input}
          onKeyPress={name}
        />
      </div>
      {typeof weather.main != "undefined" ? (
        <div className="container" id="weather_cont">
          <div className="city">
            <p id="city_name">
              <span>
                <i className="fas fa-map-marker-alt"></i>
              </span>
              {weather.name},{weather.sys.country}
            </p>
            <div>{getDate()}</div>
          </div>
          <div className="tempe">
            <span>
              <i className="fas fa-thermometer-full"></i>
            </span>
            {Math.round(weather.main.temp - 273.15)}°c
          </div>
          <div className="des">{weather.weather[0].main}</div>

          <div className="items">
            <div className="row">
              <div className="col item">
                <p>
                  <i className="fas fa-temperature-high"></i>
                </p>
                <p className="item_name">Temperature Felt</p>
                <p>{Math.round(weather.main.feels_like - 273.15)}°c</p>
              </div>
              <div className="item col">
                <p><i className="fas fa-tint"></i></p>
                <p className="item_name">Humidity</p>
                <p>{weather.main.humidity} %</p>
              </div>
            </div>
            <div className="row">
              <div className="item col">
                <p>
                  <i className="fas fa-wind"></i>
                </p>
                <p className="item_name">Speed</p>
                <p>{weather.wind.speed} km/h</p>
              </div>
              <div className="item col">
                <p>
                  <i className="fas fa-tachometer-alt"></i>
                </p>
                <p className="item_name">Pressure</p>
                <p>{weather.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
