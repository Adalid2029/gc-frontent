import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import { useState, useRef } from "react";

import buttonDropdown from "../skin/buttons/button-dropdown.skin";
import Icon from "../../../components/common/icon";

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
        {buttonLabel}&nbsp;&nbsp;
        <Icon icon="caret-down" />
      </button>

      <ul className={classes["dropdown-menu"]}>
        {buttons.map((button) => (
          <li key={button.key}>
            <a
              href={button.url ? button.url : ""}
              target={button.newTab ? "_blank" : undefined}
              className="dropdown-item"
              rel="noreferrer"
              onClick={
                button.onClick
                  ? (event) => {
                      event.preventDefault();
                      if (button.onClick) {
                        button.onClick({
                          primaryKeyValue: button.primaryKeyValue,
                        });
                      }
                    }
                  : undefined
              }
            >
              <span>
                {button.icon && (
                  <>
                    <Icon icon={button.icon} />
                    &nbsp;&nbsp;
                  </>
                )}
                {button.text}
              </span>
            </a>
          </li>
        ))}
      </ul>
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
