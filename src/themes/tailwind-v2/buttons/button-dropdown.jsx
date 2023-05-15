import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { useState, useRef } from "react";

import buttonDropdown from "../skin/buttons/button-dropdown.skin";
import Icon from "../../../components/common/icon";
import ButtonDropdownList from "./button-dropdown-list";

const useStyles = createUseStyles(buttonDropdown);

const ButtonDropdown = ({
  buttons,
  buttonIcon,
  buttonLabel,
  direction,
  leftSpace,
}) => {
  const buttonDropdownRef = useRef(null);
  const [opened, setOpen] = useState(false);

  function openToggle() {
    setOpen(!opened);
  }

  function close(event) {
    // Having enough time to close in case you press any click into the dropdown
    setTimeout(() => {
      setOpen(false);
    }, 200);
  }

  const classes = useStyles({ opened, direction, leftSpace });

  if (buttons.length === 0) {
    return null;
  }

  return (
    <div className={classes["dropdown-menu-container"]} ref={buttonDropdownRef}>
      <button
        className={classes["dropdown-menu-button"]}
        onClick={openToggle}
        onBlur={close}
      >
        {buttonIcon && (
          <>
            <Icon icon={buttonIcon} />
            &nbsp;
          </>
        )}
        {buttonLabel}&nbsp;
        <Icon icon="caret-down" />
      </button>

      <div
        className={classes["dropdown-menu"]}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div className="py-1" role="none">
          <ButtonDropdownList buttons={buttons} />
        </div>
      </div>
    </div>
  );
};

ButtonDropdown.propTypes = {
  buttons: PropTypes.array,
  buttonIcon: PropTypes.string,
  buttonLabel: PropTypes.string,
  direction: PropTypes.oneOf(["left", "right"]),
  leftSpace: PropTypes.bool,
};

ButtonDropdown.defaultProps = {
  buttons: [],
  buttonIcon: "",
  buttonLabel: "",
  direction: "left",
  leftSpace: false,
};

export default ButtonDropdown;
