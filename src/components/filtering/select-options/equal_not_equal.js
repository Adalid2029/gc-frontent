import i18n from "../../../utils/locale/i18n";

const SelectOptionsEqualNotEqual = () => {
  return [
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

export default SelectOptionsEqualNotEqual;
