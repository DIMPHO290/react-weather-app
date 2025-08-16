import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApioptions } from "../../api";
interface SearchOption {
  label: string;
  value: string;
}
interface SearchBarProps {
  onSearchChange: (data: SearchOption | null) => void;
}
const SearchBar = ({ onSearchChange }: SearchBarProps) => {
  const [search, setSearch] = useState<SearchOption | null>(null);

  const handleOnChange = (searchData: SearchOption | null) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  const loadOptions = async (inputValue: string) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApioptions
      );
      const result = await response.json();
      console.log(result);
      return {
        options: result.data.map((city: any) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (err) {
      console.error(err);
      return { options: [] };
    }
  };
  return (
    <AsyncPaginate
      placeholder="search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
export default SearchBar;
