import i18n from "../../../utils/locale/i18n";
import PropTypes from "prop-types";
import { memo } from "react";

const DatagridPagingItemsLabel = memo((props) => {
  const { totalEntries, filteredTotalEntries, currentPage, perPage } = props;

  const pagingStarts = (currentPage - 1) * perPage + 1;
  const pagingEnds =
    pagingStarts + perPage - 1 > filteredTotalEntries
      ? filteredTotalEntries
      : pagingStarts + perPage - 1;

  return (
    <>
      {i18n.format(i18n.t("paging_displaying"), {
        start: pagingStarts.toLocaleString(),
        end: pagingEnds.toLocaleString(),
        results: filteredTotalEntries.toLocaleString(),
      })}
      {filteredTotalEntries < totalEntries &&
        " " +
          i18n.format(i18n.t("paging_filtered_from"), {
            total_results: totalEntries.toLocaleString(),
          })}
    </>
  );
});

DatagridPagingItemsLabel.propTypes = {
  totalEntries: PropTypes.number,
  filteredTotalEntries: PropTypes.number,
  currentPage: PropTypes.number,
  perPage: PropTypes.number,
};

export default DatagridPagingItemsLabel;
