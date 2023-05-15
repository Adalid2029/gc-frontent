import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import { useDispatch } from "react-redux";
import { searchAsyncActions } from "../../../actions/search-async-actions";
import i18n from "../../../utils/locale/i18n";
import { useController } from "react-hook-form";
import { useState } from "react";
import reactSelectSkin from "../../style/common/input-type/react-select.skin";

const loadOptions = (searchValue, resolve, fieldName, dispatch) => {
  if (!searchValue.length) {
    resolve([
      {
        value: "",
        label: "",
      },
    ]);
  } else if (searchValue.length >= 2) {
    dispatch({
      type: searchAsyncActions.SEARCH,
      fieldName,
      searchValue,
      resolveCallback: resolve,
    });
  } else {
    resolve([
      {
        value: "",
        label: "",
      },
      {
        value: "",
        label: i18n.format(i18n.t("enter_x_or_more_characters"), {
          remaining_chars: (2 - searchValue.length).toString(),
        }),
      },
    ]);
  }
};

const getValueLabel = (value, valueLabel, valueLabelDefault) => {
  if (!value) {
    return "";
  } else if (valueLabel) {
    return valueLabel;
  }

  return valueLabelDefault;
};

function InputDynamicRelational({
  className,
  control,
  id,
  isNullable,
  name: originalName,
  value: originalValue,
  valueLabel: valueLabelDefault,
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
  const [valueLabel, setValueLabel] = useState("");

  let options = [];

  if (isNullable) {
    options.push({
      value: "",
      label: "",
    });
  }

  return (
    <AsyncSelect
      options={options}
      className={className}
      id={id}
      onChange={(event) => {
        onChange({ target: { name, value: event.value } });
        setValueLabel(event.label);
      }}
      styles={reactSelectSkin}
      loadOptions={(inputValue, callback) =>
        loadOptions(inputValue, callback, name, dispatch)
      }
      defaultOptions
      value={{
        value: value || "",
        label: getValueLabel(value, valueLabel, valueLabelDefault),
      }}
    />
  );
}

InputDynamicRelational.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  isNullable: PropTypes.bool,
  name: PropTypes.string,
  permittedValues: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputDynamicRelational;
