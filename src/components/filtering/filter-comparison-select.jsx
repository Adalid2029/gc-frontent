import { getSelectOptionsComponentFromDataType } from "../../utils/filtering-helper";

const FilterComparisonSelect = ({
  onChange,
  className,
  name,
  value,
  dataType,
}) => {
  const SelectOptions = getSelectOptionsComponentFromDataType(dataType);

  return (
    <select onChange={onChange} className={className} name={name} value={value}>
      <SelectOptions />
    </select>
  );
};

export default FilterComparisonSelect;
