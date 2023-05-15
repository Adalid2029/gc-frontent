import i18n from "../../../utils/locale/i18n";

const TextSelectOptions = () => {
  return [
    <option key="contains" value="contains">
      {i18n.t("filtering_contains")}
    </option>,
    <option key="starts_with" value="starts_with">
      {i18n.t("filtering_starts_with")}
    </option>,
    <option key="ends_with" value="ends_with">
      {i18n.t("filtering_ends_with")}
    </option>,
    <option key="equals" value="equals">
      {i18n.t("filtering_equals")}
    </option>,
    <option key="not_equals" value="not_equals">
      {i18n.t("filtering_not_equals")}
    </option>,
    <option key="is_empty" value="is_empty">
      {i18n.t("filtering_is_empty")}
    </option>,
    <option key="is_not_empty" value="is_not_empty">
      {i18n.t("filtering_is_not_empty")}
    </option>,
  ];
};

export default TextSelectOptions;
