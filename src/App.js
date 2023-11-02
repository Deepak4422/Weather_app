import { useState, useEffect } from "react";
import "./App.css";
import { runAPI } from "./components/weatherAPI.js";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { GiPressureCooker } from "react-icons/gi";
import Description from "./components/Description";

function App() {
  const [city, setCity] = useState("paris)");
  const [degree, setDegree]=useState("C");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  const setcity = async (event) => {
    if (event.keyCode === 13) {
      setCity(event.target.value);
      const data = await runAPI(city);
      setWeather(data);
      event.target.blur();
      console.log(data);
    }
  };

  const set_the_unit=async(e)=>{
     const val=e.target.value;
     if(val==="C")
     {
      setUnits("imperial");
       setDegree("F");
     }
     else{
      setUnits("metric");
      setDegree("C");
     }
  };

  useEffect(() => {
    const runApi_function = async () => {
      const data = await runAPI("paris",units);
      setWeather(data);
    };

    runApi_function();
  }, [units]);
  const card = [
    {
      key: 1,
      data: weather ? weather.temp_min : "",
      title: "Min",
      icon: <BiDownArrow />,
      unit: units === "metric" ? "C" : "F",
    },
    {
      key: 2,
      data: weather ? weather.temp_max : "",
      title: "Max",
      icon: <BiDownArrow />,
      unit: units === "metric" ? "C" : "F",
    },
    {
      key: 3,
      data: weather ? weather.pressure : "",
      title: "Pressure",
      icon: (
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/000000/pressure.png"
          alt="pressure"
        />
      ),
      unit: "kPa",
    },
    {
      key: 4,
      data: weather ? weather.humidity : "",
      title: "Humidity",
      icon: (
        <img
          width="64"
          height="64"
          src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-humidity-weather-justicon-flat-justicon.png"
          alt="external-humidity-weather-justicon-flat-justicon"
        />
      ),
      unit: "%",
    },
    {
      key: 5,
      data: weather ? weather.speed : "",
      title: "Speed",
      icon: (
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/bubbles/50/000000/wind.png"
          alt="wind"
        />
      ),
      unit: units === "metric" ? "Km/h" : "mile/hr",
    },
  ];
  return (
    <div className="container-lg">
      <div className="row" style={{ marginBottom: "10vh", overflow: "auto" }}>
        <div
          className="col-md-8  col-sm-11 p-2"
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "10vh",
            backgroundColor: "black",
            margin: "auto",
            opacity: "0.7",
          }}
        >
          <input
            onKeyDown={setcity}
            className="input"
            type="text"
            placeholder="Enter the city name"
          ></input>

          <button onClick={set_the_unit} className="button">{degree}</button>
        </div>
      </div>

      {weather && (
        <div className="container-fluid">
          <div className="row  section-temperature ">
            <div
              className="col-md-8 d-flex justify-content-between"
              style={{
                backgroundColor: "black",
                margin: "auto",
                color: "white",
                alignItems: "center",
                opacity: "0.7",
              }}
            >
              <div className="condition">
                <div className="place">{`${weather.name}, ${weather.country}`}</div>

                <img
                  width="48"
                  height="48"
                  src={weather.icon_url}
                  alt="summer"
                />
                <p>{weather.description} </p>
              </div>
              <div
                className="temp"
                style={{
                  width: "15%",
                  marginRight: "5%",
                  fontWeight: "500",
                  fontSize: "50px",
                }}
              >{`${weather.temp} `}</div>
            </div>
          </div>

          <div className="row" style={{ marginTop: "10vh" }}>
            <div
              className="col-md-8 d-flex flex-wrap   justify-content-between"
              style={{ margin: "auto", padding: "0" }}
            >
              {card.map(({ key, data, icon, title, unit }) => {
               return  <Description
                  key={key}
                  data={data}
                  icon={icon}
                  title={title}
                  unit={unit}
                />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
