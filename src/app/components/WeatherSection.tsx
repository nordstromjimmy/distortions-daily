import WeatherIcon from "./WeatherIcon";

interface WeatherSectionProps {
  weather: string;
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
}

export default function WeatherSection({
  weather,
  temperature,
}: WeatherSectionProps) {
  return (
    <section className="text-center bg-white p-6 rounded-md shadow-md flex flex-col items-center gap-4">
      <WeatherIcon weatherDescription={weather} />
      <div>
        <h4 className="text-2xl font-bold uppercase mb-2 text-gray-700">
          Weather Report
        </h4>
        <p className="italic text-md text-gray-600">{weather}</p>
        <p className="text-md text-gray-500 mt-2">
          Temperature: {temperature.celsius}°C / {temperature.fahrenheit}°F
        </p>
      </div>
    </section>
  );
}
