const getMatchingCities = query => {
  query = query.charAt(0).toUpperCase() + query.slice(1);

  const results = cities.filter(city => city.startsWith(query));
  if (results.length >= 30) {
    results.length = 30;
    return results;
  }
  const regex = new RegExp(query, "i");
  cities.forEach(city => {
    if (results.length >= 30) return results;
    if (city.match(regex) && results.indexOf(city) < 0) {
      results.push(city);
    }
  });
  return results;
};
