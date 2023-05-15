import React from "react";
import PropTypes, { shape } from "prop-types";
import i18n from "../../../utils/locale/i18n";
import { useSelector } from "react-redux";

const selectlandingPageUrl = (state) => state.configuration.landingPageUrl;
const selectUrlHistory = (state) => state.configuration.urlHistory;

const ActionsColumn = (props) => {
  const {
    DatagridCheckbox,
    GroupButtons,
    GroupButtonsList,
    GroupPrimaryButton,
    LinkButtonWrapper,
    actionButtons,
    backendActionButtons,
    onClone,
    onDelete,
    onEdit,
    onRead,
    onSelectRowToggle,
    options: {
      hasEdit,
      hasRead,
      hasClone,
      hasDelete,
      hasActionButtons,
      hasActionButtonsMultiple,
      deleteMultiple,
      actionButtonHasIcon,
      actionButtonHasText,
    },
    primaryKeyValue,
    isMobileDevice,
    selectedIds,
    urlUniqueHash,
    maxActionButtons,
  } = props;

  const landingPageUrl = useSelector(selectlandingPageUrl);
  const urlHistory = useSelector(selectUrlHistory);

  let buttons = [];

  // TODO: To pass the urlUniqueHash at the future
  const uniqueHashPrefix = urlUniqueHash ? `/${urlUniqueHash}` : "";

  if (hasEdit) {
    buttons.push({
      key: "gc-edit",
      url: urlHistory
        ? `${landingPageUrl}${uniqueHashPrefix}/edit/${primaryKeyValue}`
        : "",
      icon: actionButtonHasIcon && "pencil-alt",
      text: actionButtonHasText && i18n.t("edit"),
      label: i18n.t("edit"),
      onClick: ({ primaryKeyValue }) => onEdit({ primaryKeyValue }),
      newTab: false,
      primaryKeyValue,
    });
  }

  if (hasRead) {
    buttons.push({
      key: "gc-read",
      url: urlHistory
        ? `${landingPageUrl}${uniqueHashPrefix}/read/${primaryKeyValue}`
        : "",
      icon: actionButtonHasIcon && "eye",
      text: actionButtonHasText && i18n.t("view"),
      label: i18n.t("view"),
      onClick: ({ primaryKeyValue }) => onRead({ primaryKeyValue }),
      newTab: false,
      primaryKeyValue,
    });
  }

  if (hasClone) {
    buttons.push({
      key: "gc-clone",
      url: urlHistory
        ? `${landingPageUrl}${uniqueHashPrefix}/clone/${primaryKeyValue}`
        : "",
      icon: actionButtonHasIcon && "copy",
      text: actionButtonHasText && i18n.t("clone"),
      label: i18n.t("clone"),
      onClick: ({ primaryKeyValue }) => onClone({ primaryKeyValue }),
      newTab: false,
      primaryKeyValue,
    });
  }

  // Also checking the hasActionButtons for performance reasons (faster than checking the length of the array)
  if (hasActionButtons && actionButtons) {
    actionButtons.forEach((button) => {
      buttons.push({
        key: button.label,
        icon: actionButtonHasIcon && button.iconName,
        text: actionButtonHasText && button.label,
        label: button.label,
        onClick: button.onClick,
        newTab: false,
        primaryKeyValue,
      });
    });
  }

  // Also checking the hasActionButtons for performance reasons (faster than checking the length of the array)
  if (hasActionButtons && backendActionButtons) {
    backendActionButtons.forEach((button) => {
      buttons.push({
        key: button.label,
        icon: actionButtonHasIcon && button.iconName,
        text: actionButtonHasText && button.label,
        label: button.label,
        newTab: button.newTab,
        url: button.url,
        primaryKeyValue,
      });
    });
  }

  if (hasDelete) {
    buttons.push({
      key: "gc-delete",
      icon: actionButtonHasIcon && "trash",
      text: actionButtonHasText && i18n.t("action_delete"),
      label: i18n.t("action_delete"),
      onClick: ({ primaryKeyValue }) => onDelete({ primaryKeyValue }),
      newTab: false,
      primaryKeyValue,
    });
  }

  return (
    <>
      {(deleteMultiple || hasActionButtonsMultiple) && !isMobileDevice && (
        <DatagridCheckbox
          checked={selectedIds.indexOf(primaryKeyValue) > -1}
          onChange={() => onSelectRowToggle({ rowId: primaryKeyValue })}
        />
      )}
      <GroupButtons
        buttons={buttons}
        LinkButtonWrapper={LinkButtonWrapper}
        GroupPrimaryButton={GroupPrimaryButton}
        GroupButtonsList={GroupButtonsList}
        maxActionButtons={maxActionButtons}
        isMobileDevice={isMobileDevice}
      />
    </>
  );
};

ActionsColumn.propTypes = {
  actionButtons: PropTypes.array,
  backendActionButtons: PropTypes.array,
  options: shape({
    deleteMultiple: PropTypes.bool,
    hasEdit: PropTypes.bool,
    hasClone: PropTypes.bool,
    hasDelete: PropTypes.bool,
    hasRead: PropTypes.bool,
    hasActionButtons: PropTypes.bool,
  }),
  onEdit: PropTypes.func,
  onClone: PropTypes.func,
  onRead: PropTypes.func,
  onDelete: PropTypes.func,
  urlUniqueHash: PropTypes.string,
  screenSize: PropTypes.string,
  rowSelected: PropTypes.bool,
  toggleSelectRow: PropTypes.func,
  primaryKeyValue: PropTypes.string,
  i18n: PropTypes.shape({
    edit: PropTypes.string,
    view: PropTypes.string,
    action_delete: PropTypes.string,
    actions: PropTypes.string,
    more: PropTypes.string,
    clone: PropTypes.string,
  }),
  LinkButtonWrapper: PropTypes.func,
  GroupButtonsList: PropTypes.func,
  GroupButtons: PropTypes.func,
};

ActionsColumn.defaultProps = {
  urlUniqueHash: "",
  DatagridCheckbox: () => <input type="checkbox" />,
  GroupButtons: ({ buttons }) =>
    buttons.map((button) => <button key={button.key}>{button.text}</button>),
  options: {
    actionButtonHasIcon: true,
    actionButtonHasText: true,
  },
};

export default ActionsColumn;
