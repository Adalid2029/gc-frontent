import i18n from "../../../utils/locale/i18n";

const ComparisonSelectOptions = () => {
  return [
    <option key="equals" value="equals">
      {i18n.t("filtering_equals")}
    </option>,
    <option key="not_equals" value="not_equals">
      {i18n.t("filtering_not_equals")}
    </option>,
    <option key="greater_than" value="greater_than">
      {i18n.t("filtering_greater_than")}
    </option>,
    <option key="less_than" value="less_than">
      {i18n.t("filtering_less_than")}
    </option>,
    <option key="greater_than_or_equal" value="greater_than_or_equal">
      {i18n.t("filtering_greater_than_or_equal")}
    </option>,
    <option key="less_than_or_equal" value="less_than_or_equal">
      {i18n.t("filtering_less_than_or_equal")}
    </option>,
    <option key="is_empty" value="is_empty">
      {i18n.t("filtering_is_empty")}
    </option>,
    <option key="is_not_empty" value="is_not_empty">
      {i18n.t("filtering_is_not_empty")}
    </option>,
  ];
};

export default ComparisonSelectOptions;
