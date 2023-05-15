import { createUseStyles } from "react-jss";

import groupButtonSkin from "../skin/buttons/buttons.skin";
import Icon from "../../../components/common/icon";
import ButtonDropdown from "./button-dropdown";
import i18n from "../../../utils/locale/i18n";
import PropTypes from "prop-types";

const useStyles = createUseStyles(groupButtonSkin);

const GroupButtons = (props) => {
  const { buttons, maxButtons } = props;
  const classes = useStyles(props);

  return (
    <>
      {buttons
        .filter((__button, key) => key < maxButtons - 1)
        .map((button) => (
          <a
            href={button.url ? button.url : ""}
            className={classes["simple-button"]}
            key={button.key}
            onClick={(event) => {
              event.preventDefault();
              if (button.onClick) {
                button.onClick({ primaryKeyValue: button.primaryKeyValue });
              }
            }}
          >
            {button.icon && (
              <>
                <Icon icon={button.icon} />
                &nbsp;
              </>
            )}
            {button.text}
          </a>
        ))}
      <ButtonDropdown
        buttons={buttons.filter((__button, key) => key >= maxButtons - 1)}
        buttonLabel={maxButtons === 1 ? i18n.t("actions") : i18n.t("more")}
      />
    </>
  );
};

GroupButtons.propTypes = {
  buttons: PropTypes.array,
  maxButtons: PropTypes.number,
};

GroupButtons.defaultProps = {
  buttons: [],
  maxButtons: 2,
};

export default GroupButtons;
