import ListItem from "@/ui/ListItem/ListItem";

import { useSearch } from "@/context/SearchContext";

export default function ItemsList({ filterField = "name", useItems }) {
  const items = useItems();
  const { keyword } = useSearch();

  const filteredItems = items.filter(({ item }) =>
    item[filterField].toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div
      className={`board_files_list ${
        filteredItems.length === 0 && keyword ? "is-empty" : ""
      }`}
    >
      {filteredItems.map(({ item, id, type }) => (
        <ListItem item={item} id={id} type={type} key={id} />
      ))}
    </div>
  );
}
