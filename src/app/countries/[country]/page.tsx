import Link from 'next/link';
import Image from 'next/image'

import { fetchCountries } from '../../../services/countryServices';
import { Button } from '@/components/ui/button';
import { GoArrowLeft } from "react-icons/go";

interface CountryDetailProps {
  params: {
    country: string;
  };
  name: {
    common: string;
    nativeName?: { 
      common: string;
    };
  };
  region: string;
  subregion: string;
  capital: string;
  population: number;
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
    };
  };
  flags: {
    png: string;
  };
  borders: string[];
}


 export const CountryDetail = async ({ params }: CountryDetailProps) => {
  const countries = await fetchCountries();
  const country = countries.find((c: any) => c.cca3 === params.country);

  if (!country) {
    return <div>Country not found</div>;
  }

  const languages = Object.values(country.languages).join(', ');
  const currencies = Object.values(country.currencies)
    .map((currency: any) => `${currency.name}`)
    .join(', ');

    const nativeName = Object.values(country.name.nativeName || {}).find((native): native is { common: string } => 'common' in native)?.common;

  const borderCountries = country.borders.map((borderCode: string) => {
    const borderCountry = countries.find((c: any) => c.cca3 === borderCode);
    return borderCountry ? borderCountry.name.common : borderCode;
  });

  return (
    <>
      <div className="mx-6 md:mx-40 2xl:mx-[18rem] mt-5 ">
        <Button className='w-24 bg-gray-400 dark:bg-slate-500'>
          <Link href='/'>
            <GoArrowLeft />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20 px-4">
        <div className="flex justify-center">
          <Image src={country.flags.png} width={400} height={100} alt={country.name.common} className="max-w-full h-auto" />
        </div>
        <div className="mx-5 space-y-4 ">
          <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
          <div className='flex flex-col  gap-10 md:flex-row md:space-x-16 ' >
            <div className="" >
              <p>Native Name: {nativeName}</p>
              <p>Population: {country.population.toLocaleString()}</p>
              <p>Region: {country.region}</p>
              <p>Subregion: {country.subregion}</p>
              <p>Capital: {country.capital}</p>
            </div>
            <div>
              <p>Languages: {languages}</p>
              <p>Currencies: {currencies}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Border Countries:</h2>
            <ul className="flex flex-wrap gap-2">
              {borderCountries.length > 0 ? (
                borderCountries.map((border: string, index: number) => (
                  <li key={index} className="border-2 rounded-sm px-2">
                    <Link href={`/countries/${country.borders[index]}`}>
                      {border}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No border countries</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};


