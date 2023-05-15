import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import AsyncSelect from "react-select/async";

import i18n from "../../../utils/locale/i18n";
import { searchAsyncActions } from "../../../actions/search-async-actions";
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

const SearchInputDynamicSelect = ({
  className,
  required,
  onChange,
  value,
  displayAs,
  fieldName,
}) => {
  const dispatch = useDispatch();

  return (
    <AsyncSelect
      className={className}
      onInputChange={(newValue) => newValue}
      onChange={(event) => {
        onChange({
          target: { value: { key: event.value, displayAs: event.label } },
        });
      }}
      styles={reactSelectSkin}
      value={{
        value: value || "",
        label: value ? displayAs : "",
      }}
      loadOptions={(inputValue, callback) =>
        loadOptions(inputValue, callback, fieldName, dispatch)
      }
      defaultOptions
      required={required}
    />
  );
};

SearchInputDynamicSelect.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputDynamicSelect;
