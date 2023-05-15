import Icon from "../../../components/common/icon";
import buttonsSkin from "../skin/buttons/buttons.skin";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles(buttonsSkin);

const Button = ({ onClick, icon, label, link = false, href }) => {
  const classes = useStyles();

  if (link) {
    return (
      <a className={classes["simple-button"]} onClick={onClick} href={href}>
        {icon && (
          <>
            <Icon icon={icon}></Icon>&nbsp;
          </>
        )}
        {label}
      </a>
    );
  }

  return (
    <button className={classes["simple-button"]} onClick={onClick}>
      {icon && (
        <>
          <Icon icon={icon}></Icon>&nbsp;
        </>
      )}
      {label}
    </button>
  );
};

export default Button;
