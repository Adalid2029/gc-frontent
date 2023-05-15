import { useState, useEffect, useLayoutEffect } from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import DatePicker, { registerLocale } from "react-datepicker";
import { useSelector } from "react-redux";

import { loadCSS } from "../../../utils/themes";
import { doubleDigit } from "../../../utils/numbers-helper";
import { VALID_SQL_DATE_REGEX } from "../../../utils/field-types";

const selectLocalCode = (state) => state.configuration.locale;
const selectDateFormat = (state) => state.configuration.dateFormat;

function InputDate({
  className,
  control,
  id,
  name: originalName,
  placeholder,
  required,
  value: originalValue,
  loadCssThirdParty,
}) {
  const {
    field: { onChange, onBlur, name, value },
  } = useController({
    name: originalName,
    control,
    defaultValue: originalValue,
    shouldUnregister: true,
  });
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
      name={name}
      selected={
        value && VALID_SQL_DATE_REGEX.test(value) ? new Date(value) : ""
      }
      className={className}
      onBlur={onBlur}
      locale={locale}
      dateFormat={dateFormat} // P is the configuration to get the format from the locale
      onChange={(newValue) => {
        const dateAsSqlString = newValue
          ? newValue.getFullYear() +
            "-" +
            doubleDigit(newValue.getMonth() + 1) +
            "-" +
            doubleDigit(newValue.getDate())
          : "";
        onChange(dateAsSqlString);
      }}
      required={required}
      placeholderText={placeholder}
      id={id}
    />
  );
}

InputDate.propTypes = {
  className: PropTypes.string,
  control: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default InputDate;
