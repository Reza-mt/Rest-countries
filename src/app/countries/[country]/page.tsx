
import Link from 'next/link';

import { fetchCountries } from '../../../services/countryServices';
import { Button } from '@/components/ui/button';
import { GoArrowLeft } from "react-icons/go";

interface CountryDetailProps {
  params: {
    country: string;
  };
}

const CountryDetail = async ({ params }: CountryDetailProps) => {

  const countries = await fetchCountries();
  const country = countries.find((c: any) => c.cca3 === params.country);


  if (!country) {
    return <div>Country not found</div>;
  }



  const languages = Object.values(country.languages).join(', ');

  const currencies = Object.values(country.currencies)
    .map((currency: any) => `${currency.name}`)
    .join(', ');
  const nativeName = Object.values(country.name.nativeName || {})[0]?.common || 'N/A';

  return (
    <>
      <div className="p-4" >
        <Button className='w-24  bg-gray-400 dark:bg-slate-500 ' >
          <Link href='/' >
            <GoArrowLeft />
          </Link>
        </Button>
      </div>
      <div className=" grid justify-center space-x-52 my-20  " >
        <div className=" " >
          <img src={country.flags.png} alt={country.name.common} className="w-auto  " />
        </div>
        <div className="flex p-4">
          <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
          <div className="" >
            <p>NativeName: {nativeName}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Capital: {country.capital}</p>
          </div>
          <span>
            <p>Languages: {languages}</p>
            <p>Currencies: {currencies}</p>
          </span>
        </div>
        <div className="flex justify-" >
          <h2 className="text-2xl font-semibold mt-4">Border Countries:</h2>
          <ul className="flex justify-center items-center" >
            {country.borders.map((border: string) => (
              <li key={border}>
                <Link href={`/countries/${border}`}>
                  {border}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CountryDetail;
