
import { fetchCountries } from '../../../services/countryServices';
import Link from 'next/link';

interface CountryDetailProps {
  params: {
    country: string;
  };
}

const CountryDetail = async ({ params }: CountryDetailProps) => {
  console.log('params:', params); 

  const countries = await fetchCountries();
  console.log('countries:', countries.map(c => c.cca3)); 

  const country = countries.find((c: any) => c.cca3 === params.country);
  console.log('country:', country); 

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
      <img src={country.flags.png} alt={country.name.common} className="mb-4" />
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <h2 className="text-2xl font-semibold mt-4">Border Countries:</h2>
      <ul>
        {country.borders.map((border: string) => (
          <li key={border}>
            <Link href={`/countries/${border}`}>
              <a className="text-blue-500 hover:underline">{border}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryDetail;
