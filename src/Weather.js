import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Humidity } from "./humidity.svg";
import CircularProgress from "@mui/material/CircularProgress";
import WeatherIcon from "./WeatherIcon";

import moment from "moment";
import "moment/min/locales.min";
moment.locale("en");

export default function Weather({ btnClick, cityValue, localState }) {
  let [weatherData, setWeatherData] = useState({});
  let [desc, setDesc] = useState({});
  let [timing, setTiming] = useState("");
  let [cityNotFound, setCityNotFound] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loading state until the api response
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
        setCityNotFound(false);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        if (error.response) {
          // if the server response with an error
          setCityNotFound(true);
          setIsLoading(false);
        }
      });
    // cancel the request
    return () => controller.abort();
  }, [cityValue, localState, i18n]);

  // expose the current condition to the page background theme
  useEffect(() => {
    if (desc.icon) {
      document.body.dataset.weather = desc.icon;
    }
    return () => {
      delete document.body.dataset.weather;
    };
  }, [desc.icon]);

  function weatherDataRender() {
    const weatherDataJSX = (
      <Stack
        className="weather-data"
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
      >
        <div>
          <Typography variant="h3" sx={{ color: "inherit" }}>
            {toFixed2(weatherData.temp)}°C
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Typography variant="h5" flex={1} sx={{ color: "inherit" }}>
              {t(desc.description)}
            </Typography>
            <span> {weatherData.humidity}% </span>
            <Humidity style={{ maxWidth: "20px" }} />
          </Stack>
          <Stack direction="row" alignItems="center" mt={1}>
            <Typography variant="subtitle1" sx={{ color: "inherit" }}>
              {t("min")} {toFixed2(weatherData.temp_min)} °C
            </Typography>
            <span style={{ marginInline: "10px" }}> | </span>
            <Typography variant="subtitle1" sx={{ color: "inherit" }}>
              {t("max")} {toFixed2(weatherData.temp_max)} °C
            </Typography>
          </Stack>
        </div>
        <WeatherIcon icon={desc.icon} description={t(desc.description)} />
      </Stack>
    );
    const NotFound = (
      <Typography variant="h6" sx={{ color: "inherit" }}>
        {t("This city is not found")}
      </Typography>
    );
    if (cityNotFound) {
      return NotFound;
    } else {
      return weatherDataJSX;
    }
  }

  function toFixed2(value) {
    return Number(value).toFixed(1);
  }

  if (isLoading) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Typography variant="h4" sx={{ color: "inherit" }}>
          {cityValue}
        </Typography>
        <Typography variant="h6" sx={{ color: "inherit" }}>
          {timing}
        </Typography>
      </Stack>
      <Divider className="weather-divider" />
      {weatherDataRender()}
      <Button
        variant="contained"
        style={{ marginTop: "1rem" }}
        onClick={() => btnClick(false)}
      >
        {t("Search for another city")}
      </Button>
    </>
  );
}
