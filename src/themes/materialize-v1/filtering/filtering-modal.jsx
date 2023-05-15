import { createUseStyles } from "react-jss";
import filteringDialogSkin from "../skin/filtering/filtering-dialog.skin";
import Filtering from "./filtering";

const useStyles = createUseStyles(filteringDialogSkin);

const FilteringModal = (props) => {
  const { filteringModalOpen, onFilteringSubmit, columns } = props;

  const classes = useStyles(props);

  return (
    <div
      className={classes["filtering-modal"]}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
    >
      {filteringModalOpen && (
        <Filtering {...props} fields={columns} onSubmit={onFilteringSubmit} />
      )}
    </div>
  );
};

export default FilteringModal;
