import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { dependedFieldsActions } from "../../../../actions/depended-fields-actions";
import reactSelectSkin from "../../../style/common/input-type/react-select.skin";

function ReactSelect({
  className,
  control,
  id,
  options,
  name: originalName,
  required,
  value: originalValue,
  isDependencyField,
}) {
  const {
    field: { onChange, name, value },
  } = useController({
    name: originalName,
    control,
    defaultValue: originalValue,
    shouldUnregister: true,
  });

  const dispatch = useDispatch();

  return (
    <Select
      required={required}
      className={className}
      onChange={(event) => {
        onChange({ target: { name, value: event.value } });

        if (isDependencyField) {
          dispatch({
            type: dependedFieldsActions.UPDATE_DEPENDENCY,
            fieldName: name,
            fieldValue: event.value,
          });
        }
      }}
      value={options.filter((option) => option.value === value)}
      styles={reactSelectSkin}
      name={name}
      id={id}
      options={options}
    />
  );
}

ReactSelect.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  domType: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  value: PropTypes.string,
  options: PropTypes.array,
};

ReactSelect.defaultProps = {
  options: [],
};

export default ReactSelect;
