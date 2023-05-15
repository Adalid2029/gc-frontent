import i18n from "../../../utils/locale/i18n";

const SelectOptionsHasOrNot = () => {
  return [
    <option key="has" value="has">
      {i18n.t("filtering_has")}
    </option>,
    <option key="does_not_have" value="does_not_have">
      {i18n.t("filtering_does_not_have")}
    </option>,
    <option key="is_empty" value="is_empty">
      {i18n.t("filtering_is_empty")}
    </option>,
    <option key="is_not_empty" value="is_not_empty">
      {i18n.t("filtering_is_not_empty")}
    </option>,
  ];
};

export default SelectOptionsHasOrNot;
