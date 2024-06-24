// import { CountriesCart } from "@/components/Countries/countriesCart";
import CountiresCard from "@/components/Card/countriesCard";
import { SearchBar } from "@/components/Search/SearchBar";
import Navbar from "@/components/navbar/navbar";


export default function Home() {
  return (
    <main >
      <Navbar/>
      <hr className="h-px my-1 bg-black border-2 dark:bg-gray-700"></hr>
      <SearchBar/>
      <CountiresCard/>
    </main>
  )
}
