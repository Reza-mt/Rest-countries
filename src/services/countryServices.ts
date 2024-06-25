
 
export const fetchCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data.map((country: any) => ({
    name: country.name,
    nativeName: country.nativeName,
    region: country.region,
    capital: country.capital,
    currencies:country.currencies,
    subregion: country.subregion,
    languages: country.languages,
    population: country.population,
    borders: country.borders || [],
    flags: country.flags,
    cca3: country.cca3,
  }));
};