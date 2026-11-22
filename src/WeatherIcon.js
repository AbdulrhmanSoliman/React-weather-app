import "./weatherIcon.css";

// Animated SVG weather icons mapped from OpenWeatherMap icon codes
// (01d/01n ... 50d/50n). Pure SVG + CSS keyframes: no dependencies,
// no raster images, sharp on every screen and animated per condition.

function Sun({ small = false }) {
  return (
    <g className={small ? "wi-sun wi-small" : "wi-sun"}>
      <g className="wi-rays">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="32"
            y1="10"
            x2="32"
            y2="17"
            transform={`rotate(${deg} 32 32)`}
          />
        ))}
      </g>
      <circle className="wi-sun-core" cx="32" cy="32" r="11" />
    </g>
  );
}

function Moon({ small = false }) {
  return (
    <g className={small ? "wi-moon wi-small" : "wi-moon"}>
      <path
        className="wi-moon-body"
        d="M40 40a13 13 0 1 1-14-19 11 11 0 1 0 14 19z"
      />
      <circle className="wi-star wi-star-1" cx="46" cy="18" r="1.6" />
      <circle className="wi-star wi-star-2" cx="52" cy="26" r="1.2" />
    </g>
  );
}

function Cloud({ className = "", y = 0 }) {
  return (
    <g className={`wi-cloud ${className}`} transform={`translate(0 ${y})`}>
      <path d="M20 44a8 8 0 0 1 .8-15.96A11 11 0 0 1 42 25a9.5 9.5 0 0 1 3 18.5l-.5.5H20z" />
    </g>
  );
}

function Rain() {
  return (
    <g className="wi-rain">
      <line className="wi-drop wi-drop-1" x1="24" y1="48" x2="22" y2="55" />
      <line className="wi-drop wi-drop-2" x1="32" y1="48" x2="30" y2="55" />
      <line className="wi-drop wi-drop-3" x1="40" y1="48" x2="38" y2="55" />
    </g>
  );
}

function Snow() {
  return (
    <g className="wi-snow">
      <circle className="wi-flake wi-flake-1" cx="24" cy="49" r="1.8" />
      <circle className="wi-flake wi-flake-2" cx="32" cy="49" r="1.8" />
      <circle className="wi-flake wi-flake-3" cx="40" cy="49" r="1.8" />
    </g>
  );
}

function Lightning() {
  return (
    <path
      className="wi-bolt"
      d="M33 42l-9 13h6.5l-4.5 11 13-15h-6.5l5-9z"
    />
  );
}

function Mist() {
  return (
    <g className="wi-mist">
      <line className="wi-mist-line wi-mist-1" x1="18" y1="46" x2="46" y2="46" />
      <line className="wi-mist-line wi-mist-2" x1="22" y1="52" x2="50" y2="52" />
      <line className="wi-mist-line wi-mist-3" x1="18" y1="58" x2="42" y2="58" />
    </g>
  );
}

export default function WeatherIcon({ icon = "", description = "" }) {
  const code = icon.slice(0, 2);
  const isNight = icon.endsWith("n");

  let content;
  switch (code) {
    case "01":
      content = isNight ? <Moon /> : <Sun />;
      break;
    case "02":
      content = (
        <>
          {isNight ? <Moon small /> : <Sun small />}
          <Cloud className="wi-cloud-front" y={6} />
        </>
      );
      break;
    case "03":
      content = <Cloud />;
      break;
    case "04":
      content = (
        <>
          <Cloud className="wi-cloud-back" y={-4} />
          <Cloud className="wi-cloud-front" y={6} />
        </>
      );
      break;
    case "09":
      content = (
        <>
          <Cloud />
          <Rain />
        </>
      );
      break;
    case "10":
      content = (
        <>
          {isNight ? <Moon small /> : <Sun small />}
          <Cloud className="wi-cloud-front" y={4} />
          <Rain />
        </>
      );
      break;
    case "11":
      content = (
        <>
          <Cloud />
          <Lightning />
          <Rain />
        </>
      );
      break;
    case "13":
      content = (
        <>
          <Cloud />
          <Snow />
        </>
      );
      break;
    case "50":
      content = (
        <>
          <Cloud className="wi-cloud-dim" y={-8} />
          <Mist />
        </>
      );
      break;
    default:
      content = <Cloud />;
  }

  return (
    <svg
      className="weatherIcon wi"
      viewBox="0 0 64 64"
      role="img"
      aria-label={description || "weather icon"}
    >
      {content}
    </svg>
  );
}
