import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchCountries } from '../../../services/countryServices';
import Link from 'next/link';

interface CountryDetailProps {
  country: {
    name: {
      common: string;
    };
    region: string;
    subregion: string;
    population: number;
    borders: string[];
    flags: {
      png: string;
    };
  };
}

const CountryDetail = ({ country }) => {
  const router = useRouter();
  const { country } = router.query;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
      <img src={country.flags.png} alt={country.name.common} className="mb-4" />
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <h2 className="text-2xl font-semibold mt-4">Border Countries:</h2>
      <ul>
        {country.borders.map((border) => (
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

export const getStaticPaths: GetStaticPaths = async () => {
  const countries = await fetchCountries();
  const paths = countries.map((country: any) => ({
    params: { country: country.cca3 },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const countries = await fetchCountries();
  const country = countries.find((c: any) => c.cca3 === params?.country);
  return { props: { country } };
};

export default CountryDetail;
