import Select from 'react-select';

export default function CustomSelect(props) {
  const { changed, options, selectId, value, isSearchable } = props;

  return (
    <Select
      onChange={changed}
      options={options}
      inputId={selectId}
      // value={value}
      isSearchable={isSearchable}
    />
  );
}
