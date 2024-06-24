import { fetchCountries } from '../../services/countryServices';

interface Country {
  name: {
    common: string;
  };
  region: string;
  flags: {
    png: string;
  };
  population: number;
  capital: string;
}

export default async function CountiresCard() {
  const countries = await fetchCountries();
  
  return (
    <div className="container w-4/6 mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Countries</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country: Country) => (
          <div key={country.name.common} className="p-4 border rounded-lg">
            <img src={country.flags.png} alt={country.name.common} className="mb-2" />
            <h2 className="text-xl font-semibold">{country.name.common}</h2>
            <p className="text-gray-600 font-bold ">Population: <span className=" font-normal ">{country.population}</span></p>
            <p className="text-gray-600 font-bold">Region: <span className=" font-normal ">{country.region}</span></p>
            <p className="text-gray-600 font-bold">Capital: <span className=" font-normal ">{country.capital}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

