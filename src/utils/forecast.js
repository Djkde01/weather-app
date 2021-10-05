const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9b1d896407e025571cd632a18b7bcce5&query=${lat},${long}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect, please try again", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const temperature = body.current.temperature;
      const feelsLike = body.current.feelslike;
      const forecast = body.current.weather_descriptions[0];
      const icon = body.current.weather_icons[0];
      callback(undefined, {
        forecastData: `${forecast}. It is currently ${temperature}° out. It feels like ${feelsLike}° out`,
        forecastIcon: icon,
      });
    }
  });
};

module.exports = forecast;
