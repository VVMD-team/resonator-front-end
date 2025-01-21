import { useEffect } from "react";

import { useSearch } from "@/context/SearchContext";

export default function Search() {
  const { setKeyword } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();

    setKeyword(e.target[0].value.trim());
  };

  return (
    <form className="search_component" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search"
        name="search"
        id="search"
        className="search_field"
      />
      <button type="submit" className="search_button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="search_icon feather feather-search"
          width="100%"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}
