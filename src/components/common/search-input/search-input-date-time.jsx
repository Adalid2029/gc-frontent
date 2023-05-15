import PropTypes from "prop-types";
import DatePicker, { registerLocale } from "react-datepicker";
import { useState, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { doubleDigit } from "../../../utils/numbers-helper";
import { loadCSS } from "../../../utils/themes";

const selectLocalCode = (state) => state.configuration.locale;
const selectDateFormat = (state) => state.configuration.dateFormat;

const SearchInputDateTime = ({
  className,
  onChange,
  onKeyUp,
  placeholder,
  value,
  required,
  loadCssThirdParty,
}) => {
  const localeCode = useSelector(selectLocalCode);
  const dateFormat = useSelector(selectDateFormat);
  const [locale, setLocale] = useState(false);

  useEffect(() => {
    const importLocaleFile = async () => {
      // This webpack option stops all of the date-fns files being imported and chunked.
      const localeToSet = await import(
        /* webpackMode: "lazy", webpackChunkName: "df-[index]", webpackExclude: /_lib/ */
        `date-fns/locale/${localeCode}/index.js`
      );
      registerLocale(localeCode, localeToSet.default);
      setLocale(localeToSet.default);
    };

    // If the locale has not yet been loaded.
    if (!locale || locale.code !== localeCode) {
      importLocaleFile();
    }
  }, [locale, localeCode]);

  useLayoutEffect(() => {
    if (loadCssThirdParty) {
      loadCSS("react-datepicker");
    }
  }, [loadCssThirdParty]);

  if (locale === false) {
    return null;
  }

  return (
    <DatePicker
      locale={locale}
      selected={value ? new Date(value) : ""}
      className={className}
      timeFormat="HH:mm:ss"
      dateFormat={`${dateFormat}, pp`}
      showTimeSelect={true}
      onChange={(newValue) => {
        const dateAsSqlString = newValue
          ? newValue.getFullYear() +
            "-" +
            doubleDigit(newValue.getMonth() + 1) +
            "-" +
            doubleDigit(newValue.getDate()) +
            " " +
            doubleDigit(newValue.getHours()) +
            ":" +
            doubleDigit(newValue.getMinutes()) +
            ":" +
            doubleDigit(newValue.getSeconds())
          : "";
        onChange({
          target: {
            value: dateAsSqlString,
          },
        });
      }}
      onKeyUp={onKeyUp}
      required={required}
      placeholderText={placeholder}
    />
  );
};

SearchInputDateTime.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyUp: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default SearchInputDateTime;
