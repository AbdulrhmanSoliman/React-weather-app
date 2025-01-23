// Component IMPORTS
import Weather from "./Weather";
// MUI IMPORTS
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
// React HOOKS
import { useState, useEffect } from "react";

// others IMPORTS
import { useTranslation } from "react-i18next";

export default function Content() {
  let [clicked, setClicked] = useState(false); // this state to control weather component show or unshow
  let [cityInput, setCityInput] = useState("");
  let [local, setLocal] = useState("ar");
  let [showError, setShowError] = useState(false);
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
          flex: 3,
          minWidth: "15rem",
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
      <Button
        variant="outlined"
        style={{
          width: "fit-content",
          color: "white",
          borderColor: "white",
          marginBottom: "10px",
          alignSelf: "flex-end",
        }}
        onClick={handleLangClick}
      >
        {local === "en" ? "عربي" : "English"}
      </Button>
      <Card
        sx={{
          background: "skyblue",
          color: "#000000de",
          borderRadius: "12px",
          border: "2px solid white",
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
          <p style={{ color: "#e83b46" }}>{t("Please type a city name")}</p>
        )}
      </Card>
    </Container>
  );
}
