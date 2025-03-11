interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <input
      type="text"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;