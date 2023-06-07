import "./SearchInput.css";

type SearchInputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const SearchInput = (props: SearchInputProps) => {
  return (
    <>
      <input
        type="search"
        placeholder={props.placeholder ?? "Search"}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </>
  );
};

export default SearchInput;
