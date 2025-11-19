import { Autocomplete, TextField } from "@mui/material";

const MultiSelectFilter = ({
  label,
  placeholder,
  options,
  value,
  onChange
}) => (
  <Autocomplete
    multiple
    fullWidth
    options={[
      ...value.filter(v => options.includes(v)),
      ...options.filter(o => !value.includes(o))
    ]}
    value={value}
    onChange={onChange}
    filterSelectedOptions
    disableCloseOnSelect
    getOptionLabel={option => option}
    renderInput={params => (
      <TextField
        {...params}
        label={label}
        placeholder={value.length === 0 ? placeholder : ""}
        size="small"
        variant="outlined"
        fullWidth
      />
    )}
    ListboxProps={{ style: { maxHeight: 200, overflowY: "auto" } }}
    sx={{
      "& .MuiAutocomplete-tag": {
        maxWidth: 110,
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }}
  />
);

export default MultiSelectFilter;
