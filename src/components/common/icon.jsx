import classNames from "classnames";
import PropTypes from "prop-types";

const Icon = ({ icon }) => {
  return <i className={classNames("fas", `fa-${icon}`)}></i>;
};

Icon.propTypes = {
  icon: PropTypes.string,
};

export default Icon;
