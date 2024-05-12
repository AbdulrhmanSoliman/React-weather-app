import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Humidity } from "./humidity.svg";

import moment from "moment";
import "moment/min/locales.min";
moment.locale("en");

export default function Weather({ btnClick, cityValue, localState }) {
  let [weatherData, setWeatherData] = useState({});
  let [desc, setDesc] = useState({});
  let [timing, setTiming] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (localState === "ar") {
      i18n.changeLanguage("ar");
      moment.locale("ar-sa");
    } else {
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setTiming(moment().format("Do MMMM YYYY"));
    const controller = new AbortController();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=af2985d9610a1e1e7396793e40c5d48e&units=metric`,
        {
          signal: controller.signal,
        }
      )
      .then(function (res) {
        setWeatherData(res.data.main);
        setDesc(res.data.weather[0]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    // cancel the request
    return () => controller.abort();
  }, [cityValue, localState, i18n]);

  function toFixed2(value) {
    return Number(value).toFixed(1);
  }
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Typography variant="h4">{cityValue}</Typography>
        <Typography variant="h6">{timing}</Typography>
      </Stack>
      <Divider style={{ background: "#ccc", marginBlock: "1rem" }} />
      <Stack direction="row" alignItems="center" justifyContent="space-evenly">
        <div>
          <Typography variant="h3">{toFixed2(weatherData.temp)}°C</Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Typography variant="h5" flex={1}>
              {t(desc.description)}
            </Typography>
            <span> {weatherData.humidity}% </span>
            <Humidity style={{ maxWidth: "20px" }} />
          </Stack>
          <Stack direction="row" alignItems="center" mt={1}>
            <Typography variant="subtitle1">
              {t("min")} {toFixed2(weatherData.temp_min)} °C
            </Typography>
            <span style={{ marginInline: "10px" }}> | </span>
            <Typography variant="subtitle1">
              {t("max")} {toFixed2(weatherData.temp_max)} °C
            </Typography>
          </Stack>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${desc.icon}@4x.png`}
          alt="weather-icon"
          className="weatherIcon"
        />
      </Stack>
      <Button variant="contained" onClick={() => btnClick(false)}>
        {t("Search for another city")}
      </Button>
    </>
  );
}
