import Link from 'next/link';
import Image from 'next/image'

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

export default function CountiresCard({ filteredCountries }: Props) {
  if (!filteredCountries) {
    return <div>Loading...</div>;
  }
  return (

    <div className="container w-10/12  p-4 md:w-11/12  ">
      <h1 className="text-xl font-bold mb-4">Countries</h1>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredCountries.map((country: Country) => (
          <Link key={country.cca3} href={`/countries/${country.cca3}`}>
            <div  className=" border rounded-xl flex flex-col h-full">
              <Image src={country.flags.png} width={200} height={100} alt={country.name.common} className="mb-2 h-2/4 w-full " />
              <div className=" p-4 text-gray-600 font-bold dark:text-gray-400 ">
                <h2 className="text-xl font-semibold">{country.name.common}</h2>
                <p>Population: <span className=" font-normal ">{country.population.toLocaleString()}</span></p>
                <p>Region: <span className=" font-normal ">{country.region}</span></p>
                <p>Capital: <span className=" font-normal ">{country.capital}</span></p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

