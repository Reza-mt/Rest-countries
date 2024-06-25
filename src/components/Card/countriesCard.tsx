import Link from 'next/link';
import { fetchCountries } from '../../services/countryServices';
import { Button } from '../ui/button';

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
  cca3: string;
}

interface Props {
  filteredCountries: Country[];
}

export default function CountiresCard({ filteredCountries }: Props){
  if (!filteredCountries) {
    return <div>Loading...</div>;
  }
  return (
    
    <div className="container w-auto p-4 ">
      <h1 className="text-xl font-bold mb-4">Countries</h1>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredCountries.map((country: Country) => (
          <div key={country.name.common} className=" border rounded-xl">
            <img src={country.flags.png} alt={country.name.common} className="mb-2 h-2/4 w-full " />
            <div className=" p-4 text-gray-600 font-bold dark:text-gray-400 ">
              <h2 className="text-xl font-semibold">{country.name.common}</h2>
              <p>Population: <span className=" font-normal ">{country.population}</span></p>
              <p>Region: <span className=" font-normal ">{country.region}</span></p>
              <p>Capital: <span className=" font-normal ">{country.capital}</span></p>
            </div>
            <Button className="bg-slate-700 m-4 dark:bg-slate-400 ">
              <Link href={`/countries/${country.cca3}`}>
                View Details
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

