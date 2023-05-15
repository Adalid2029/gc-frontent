import { createUseStyles } from "react-jss";
import { formatColor, memoFormatColor } from "../../../../utils/field-types";
import PropTypes from "prop-types";

const useStyles = createUseStyles({
  "color-square": {
    width: "20px",
    height: "20px",
    border: "1px solid #dddddd",
    "background-color": ({ value }) => value,
    "margin-left": "10px",
  },
  "color-text-container": {
    display: "flex",
    "align-items": "center",
  },
});

function InputColorReadOnly({ value, className, id, memo }) {
  const classes = useStyles({ value });
  const formattedColor = memo ? memoFormatColor(value) : formatColor(value);

  return (
    <div className={`${className} ${classes["color-text-container"]}`} id={id}>
      {formattedColor}
      {formattedColor !== null && <div className={classes["color-square"]} />}
    </div>
  );
}

InputColorReadOnly.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  memo: PropTypes.bool,
};

InputColorReadOnly.defaultProps = {
  memo: true,
};

export default InputColorReadOnly;
