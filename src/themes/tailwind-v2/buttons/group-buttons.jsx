import { createUseStyles } from "react-jss";

import groupButtonSkin from "../skin/buttons/buttons.skin";
import ButtonDropdown from "./button-dropdown";
import i18n from "../../../utils/locale/i18n";
import PropTypes from "prop-types";
import Button from "./button";

const useStyles = createUseStyles(groupButtonSkin);

const GroupButtons = (props) => {
  const { buttons, maxButtons } = props;
  const classes = useStyles(props);

  return (
    <div className={classes["buttons-group"]}>
      {buttons
        .filter((__button, key) => key < maxButtons - 1)
        .map((button) => (
          <Button
            key={button.key}
            onClick={(event) => {
              event.preventDefault();
              if (button.onClick) {
                button.onClick({ primaryKeyValue: button.primaryKeyValue });
              }
            }}
            link={true}
            href={button.url ? button.url : ""}
            icon={button.icon}
            label={button.text}
          />
        ))}
      <ButtonDropdown
        buttons={buttons.filter((__button, key) => key >= maxButtons - 1)}
        buttonLabel={maxButtons === 1 ? i18n.t("actions") : i18n.t("more")}
      />
    </div>
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
