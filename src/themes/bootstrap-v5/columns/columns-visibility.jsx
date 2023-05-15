import PropTypes from "prop-types";
import i18n from "../../../utils/locale/i18n";

const ColumnsVisibility = ({
  columns,
  selectColumnsAllOrNone,
  toggleVisibleColumn,
  visibleColumns,
  classes,
}) => {
  return (
    <>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={() => selectColumnsAllOrNone(columns)}
            checked={visibleColumns.length === columns.length}
          />
          &nbsp;&nbsp;{i18n.t("select_all")}
        </label>
      </div>
      <div className={classes["horizontal-line"]}></div>
      {columns.map((column) => (
        <div key={column.name}>
          <label>
            <input
              type="checkbox"
              checked={visibleColumns.includes(column.name)}
              onChange={() => toggleVisibleColumn(column.name, columns)}
            />
            &nbsp;&nbsp;
            {column.displayAs}
          </label>
        </div>
      ))}
    </>
  );
};

ColumnsVisibility.propTypes = {
  classes: PropTypes.object,
};

export default ColumnsVisibility;
