import { createUseStyles } from "react-jss";

import groupButtonSkin from "../skin/buttons/buttons.skin";
import Icon from "../../../components/common/icon";
import ButtonDropdown from "./button-dropdown";
import i18n from "../../../utils/locale/i18n";
import PropTypes from "prop-types";

const useStyles = createUseStyles(groupButtonSkin);

const GroupButtons = (props) => {
  const { buttons, maxActionButtons, isMobileDevice } = props;
  const classes = useStyles(props);

  const maxButtons = isMobileDevice
    ? maxActionButtons.mobile
    : maxActionButtons.desktop;

  const areWeGroupingButtons = buttons.length > maxButtons;

  return (
    <>
      {buttons
        // The logic here is that when we need to group buttons then we don't want to have the edge case situation
        // when the grouping button is the last one button. In that case if we keep it as is (e.g. maxButtons -1)
        // then we will have a More button that will lead to only one button which is undesirable.
        .filter((__button, key) =>
          areWeGroupingButtons ? key < maxButtons - 1 : key < maxButtons
        )
        .map((button) => (
          <a
            href={button.url ? button.url : ""}
            className={classes["simple-button"]}
            key={button.key}
            title={button.label}
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
        buttons={
          areWeGroupingButtons
            ? buttons.filter((__button, key) => key >= maxButtons - 1)
            : []
        }
        buttonLabel={maxButtons === 1 ? i18n.t("actions") : i18n.t("more")}
        leftSpace={true}
      />
    </>
  );
};

GroupButtons.propTypes = {
  buttons: PropTypes.array,
  maxActionButtons: PropTypes.shape({
    mobile: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

GroupButtons.defaultProps = {
  buttons: [],
  maxActionButtons: {
    mobile: 1,
    desktop: 2,
  },
};

export default GroupButtons;
