const formActionsPrefix = "form";

export const formActions = {
  ADD: `${formActionsPrefix}/add`,
  CLONE: `${formActionsPrefix}/clone`,
  DELETE: `${formActionsPrefix}/delete`,
  DELETE_MULTIPLE: `${formActionsPrefix}/delete-multiple`,
  EDIT: `${formActionsPrefix}/edit`,
  READ: `${formActionsPrefix}/read`,

  DELETE_ACTION_ONE: `${formActionsPrefix}/delete-action-one`,
  DELETE_ACTION_ONE_SUCCESS: `${formActionsPrefix}/delete-action-one-success`,

  DELETE_ACTION_MULTIPLE: `${formActionsPrefix}/delete-action-multiple`,
  DELETE_ACTION_MULTIPLE_SUCCESS: `${formActionsPrefix}/delete-action-multiple-success`,

  ADD_LOAD: `${formActionsPrefix}/add-load`,
  CLONE_LOAD: `${formActionsPrefix}/clone-load`,
  DELETE_LOAD: `${formActionsPrefix}/delete-load`,
  EDIT_LOAD: `${formActionsPrefix}/edit-load`,
  READ_LOAD: `${formActionsPrefix}/read-load`,

  INSERT: `${formActionsPrefix}/insert`,
  UPDATE: `${formActionsPrefix}/update`,
  REMOVE_ONE: `${formActionsPrefix}/remove-one`,

  INSERT_SUCCESS: `${formActionsPrefix}/insert-success`,
  UPDATE_SUCCESS: `${formActionsPrefix}/update-success`,

  MODAL_CLOSE: `${formActionsPrefix}/modal-close`,
  DELETE_ONE_MODAL_CLOSE: `${formActionsPrefix}/delete-one-modal-close`,
  DELETE_MULTIPLE_MODAL_CLOSE: `${formActionsPrefix}/delete-multiple-modal-close`,

  TOGGLE_CLOSE_MODAL_ON_SAVE: `${formActionsPrefix}/toggle-close-modal-on-save`,
};
