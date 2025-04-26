interface WeatherIconProps {
  weatherDescription: string;
}

export default function WeatherIcon({ weatherDescription }: WeatherIconProps) {
  const lower = weatherDescription.toLowerCase();

  if (lower.includes("rain") || lower.includes("storm")) {
    return <span className="text-3xl">🌧️</span>;
  }
  if (lower.includes("sunny") || lower.includes("clear")) {
    return <span className="text-3xl">☀️</span>;
  }
  if (lower.includes("cloud") || lower.includes("overcast")) {
    return <span className="text-3xl">☁️</span>;
  }
  if (lower.includes("snow") || lower.includes("ice")) {
    return <span className="text-3xl">❄️</span>;
  }
  if (lower.includes("fog") || lower.includes("mist")) {
    return <span className="text-3xl">🌫️</span>;
  }

  return <span className="text-3xl">🌀</span>; // Default weird weather emoji
}
