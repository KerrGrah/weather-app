const express = require("express");
const cities = require("./citiesByCountry");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 4000;

const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

//app.use(express.static(path.join(__dirname, '/build')));
const getMatchingCities = query => {
  query = query.charAt(0).toUpperCase() + query.slice(1);
  const results = [];
  cities.RU.forEach(city => {
    if (city.startsWith(query)) {
      results.push([city, "RU"]);
    }
  });
  if (results.length >= 30) {
    results.length = 30;
    return results;
  }
  const keys = Object.keys(cities);
  keys.splice(keys.indexOf("RU"), 1);
  keys.forEach(key => {
    cities[key].forEach(city => {
      if (city.startsWith(query)) results.push([city, key]);
      if (results.length >= 30) {
        results.length = 30;
        return results;
      }
    });
  });
  const regex = new RegExp(query, "i");
  keys.forEach(key => {
    cities[key].forEach(city => {
      if (results.length >= 30) return results;
      if (city.match(regex) && results.indexOf(city) < 0) {
        results.push([city, key]);
      }
    });
  });
  return results;
};

const getCitiesByCountry = country => {
  const max = cities[country].length;
  const citiesByCountry = [];
  for (let i = 0; i < 5; i++) {
    const random = getRandomInt(max);
    citiesByCountry.push(cities[country][random]);
  }
  return citiesByCountry;
};

const getRandomInt = max => {
  return Math.floor(Math.random() * (max + 1));
};

app.get("/match/:query", (req, res) => {
  res.send({ cities: getMatchingCities(req.params.query) });
});

app.get("/country/:query/", (req, res) => {
  res.send({
    cities: getCitiesByCountry(req.params.query),
    total: cities[req.params.query].length
  });
});

app.listen(port, () => {
  console.log("country list rest-api listening on port ", port);
});
