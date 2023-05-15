import { createUseStyles } from "react-jss";
import Icon from "../../../components/common/icon";
import PropTypes from "prop-types";
import DatagridPagingItemsLabel from "../../../components/datagrid/footer/datagrid-paging-items-label";
import footerSkin from "../skin/datagrid/footer.skin";

const useStyles = createUseStyles(footerSkin);

const DatagridFooter = (props) => {
  const classes = useStyles(props);

  const {
    filteredTotalEntries,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPreviousPage,
    lastPage,
    page: currentPage,
    pageChange,
    totalEntries,
    perPage,
    perPageChange,
    forceSearch,
    pagingLoading,
    pagingOptions,
  } = props;

  return (
    <div className={classes.footer}>
      <div className={classes["footer-child"]}>
        <div>Show</div>
        <div className="floatL r5 l5 t3 per-page-container">
          <select
            className="form-control form-select"
            onChange={perPageChange}
            value={perPage}
          >
            {pagingOptions.map((pageOption) => (
              <option key={pageOption} value={pageOption}>
                {pageOption}
              </option>
            ))}
          </select>
        </div>
        <div>entries</div>
      </div>
      <div className={classes["footer-child"]}>
        {pagingLoading && <div className={classes.loader} />}
        {filteredTotalEntries && !pagingLoading ? (
          <div>
            <DatagridPagingItemsLabel
              currentPage={currentPage}
              totalEntries={totalEntries}
              perPage={perPage}
              filteredTotalEntries={filteredTotalEntries}
            />
          </div>
        ) : null}
        <div>
          <ul className={classes.pagination}>
            <li className={classes["pagination-item-first"]}>
              <button
                className="page-link"
                onClick={() => goToFirstPage(currentPage, lastPage)}
              >
                <Icon icon="step-backward" />
              </button>
            </li>
            <li className={classes["pagination-item-first"]}>
              <button
                className="page-link"
                onClick={() => goToPreviousPage(currentPage, lastPage)}
              >
                <Icon icon="chevron-left" />
              </button>
            </li>
            <li>
              <input
                type="number"
                className={classes["page-number"]}
                value={currentPage}
                onChange={(event) => pageChange(event, currentPage, lastPage)}
                disabled={filteredTotalEntries === 0}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    forceSearch();
                  }
                }}
              />
            </li>
            <li className={classes["pagination-item-last"]}>
              <button
                className="page-link"
                onClick={() => goToNextPage(currentPage, lastPage)}
              >
                <Icon icon="chevron-right" />
              </button>
            </li>
            <li className={classes["pagination-item-last"]}>
              <button
                className="page-link"
                onClick={() => goToLastPage(currentPage, lastPage)}
              >
                <Icon icon="step-forward" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

DatagridFooter.propTypes = {
  page: PropTypes.number,
};

export default DatagridFooter;
