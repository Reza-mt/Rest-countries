"use client"

import { useState, useEffect } from 'react';

import { fetchCountries } from '../../services/countryServices';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Country {
  name: {
    common: string;
  };
  region: string;
  flags: {
    png: string;
  };
}

export const SearchBar = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [region, setRegion] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    };

    getCountries();
  }, []);

  const filteredCountries = countries.filter((country: Country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())&&
  (region ? country.region === region : true)
  );



  return (
    <div className="flex justify-around mt-10 ">
      <Input
        type="search"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a country"
        className="w-2/6"
      />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Country ...</SelectLabel>
            <SelectItem value="Allregion">All regions</SelectItem>
            <SelectItem value="Africa">Africa</SelectItem>
            <SelectItem value="Americas">Americas</SelectItem>
            <SelectItem value="Asia">Asia</SelectItem>
            <SelectItem value="Europe">Europe</SelectItem>
            <SelectItem value="Oceania">Oceania</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};