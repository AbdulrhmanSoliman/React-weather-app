// Component IMPORTS
import Weather from "./Weather";
// MUI IMPORTS
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
// React HOOKS
import { useState, useEffect } from "react";

// others IMPORTS
import { useTranslation } from "react-i18next";

const getInitialTheme = () => {
  const saved = window.localStorage.getItem("weather-theme");
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

export default function Content() {
  let [clicked, setClicked] = useState(false); // this state to control weather component show or unshow
  let [cityInput, setCityInput] = useState("");
  let [local, setLocal] = useState("ar");
  let [showError, setShowError] = useState(false);
  let [theme, setTheme] = useState(getInitialTheme);
  const { t, i18n } = useTranslation();

  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setClicked(true);
    }
  });

  function handleLangClick() {
    if (local === "en") {
      setLocal("ar");
      i18n.changeLanguage("ar");
      document.documentElement.dir = "rtl";
    } else {
      setLocal("en");
      i18n.changeLanguage("en");
      document.documentElement.dir = "ltr";
    }
  }

  function handleThemeClick() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("weather-theme", theme);
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage("ar");
  }, [i18n]);

  function handleClick() {
    if (cityInput !== "") {
      setClicked(true);
      setShowError(false);
    } else {
      setShowError(true);
    }
  }

  let weatherInputJSX = (
    <Stack gap={3} flexDirection="row" flexWrap="wrap">
      <TextField
        id="outlined-basic"
        label={t("City Name")}
        variant="outlined"
        value={cityInput}
        onChange={(e) => setCityInput(e.target.value)}
        sx={{
          "flex": 3,
          "minWidth": "15rem",
          "& .MuiInputBase-input": { color: "inherit" },
          "& .MuiInputLabel-root": { color: "inherit", opacity: 0.75 },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "currentColor",
            opacity: 0.6,
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "currentColor",
            opacity: 1,
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleClick}
        style={{ flex: 1, minWidth: "9rem" }}
      >
        {t("Show Weather")}
      </Button>
    </Stack>
  );

  const isDark = theme === "dark";

  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        gap={1}
        style={{ marginBottom: "10px", alignSelf: "flex-end" }}
      >
        <IconButton
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={handleThemeClick}
          style={{ color: "white", border: "1px solid rgba(255,255,255,.7)" }}
          size="small"
        >
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Button
          variant="outlined"
          style={{
            width: "fit-content",
            color: "white",
            borderColor: "white",
          }}
          onClick={handleLangClick}
        >
          {local === "en" ? "عربي" : "English"}
        </Button>
      </Stack>
      <Card
        className="weather-card"
        sx={{
          background: isDark
            ? "rgba(13, 25, 48, 0.55)"
            : "rgba(255, 255, 255, 0.72)",
          color: isDark ? "#f5f7fa" : "#12203a",
          borderRadius: "16px",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.22)"
            : "1px solid rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow: "0 18px 50px rgba(0, 0, 0, 0.28)",
        }}
      >
        <CardContent>
          {clicked === false ? (
            weatherInputJSX
          ) : (
            <Weather
              btnClick={setClicked}
              cityValue={cityInput}
              localState={local}
            />
          )}
        </CardContent>
        {showError && (
          <p style={{ color: isDark ? "#ff8a80" : "#c62828" }}>
            {t("Please type a city name")}
          </p>
        )}
      </Card>
    </Container>
  );
}
