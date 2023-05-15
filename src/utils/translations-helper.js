import i18n from "./locale/i18n";
import { formActions } from "../actions/form-actions";
import { errorActions } from "../actions/error-actions";

const titleTranslationsMapping = {
  [formActions.ADD]: "add_item",
  [formActions.CLONE]: "add_item",
  [formActions.EDIT]: "edit_item",
  [formActions.READ]: "view_item",
  [errorActions.RESPONSE_ERROR]: "error_generic_title",
};

export function getTitleTranslation(formState, subject) {
  if (titleTranslationsMapping[formState]) {
    return i18n.format(i18n.t(titleTranslationsMapping[formState]), {
      subject: subject ? subject : i18n.t("subject"),
    });
  }
  return "";
}

export function getFiltersTranslation(searchLength) {
  if (searchLength > 1) {
    return `${searchLength} ${i18n.t("filtering_filter_plural")}`;
  } else if (searchLength === 1) {
    return `1 ${i18n.t("filtering_filter_single")}`;
  }

  return i18n.t("filtering_filter_text");
}

export function getDeleteConfirmationMessage(itemsToRemove = 1) {
  if (itemsToRemove === 1) {
    return i18n.t("confirm_delete");
  } else {
    return i18n.format(i18n.t("confirm_delete_multiple"), {
      items_amount: itemsToRemove.toString(),
    });
  }
}
