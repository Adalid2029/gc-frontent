import { createUseStyles } from "react-jss";
import Icon from "../../../components/common/icon";
import PropTypes from "prop-types";
import classNames from "classnames";
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
    page,
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
            style={{
              display: "block",
            }}
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
              currentPage={page}
              totalEntries={totalEntries}
              perPage={perPage}
              filteredTotalEntries={filteredTotalEntries}
            />
          </div>
        ) : null}
        <div>
          <ul className={classes.pagination}>
            <li
              className={classNames("waves-effect", {
                disabled: page === 1,
              })}
            >
              <a
                href="#!"
                onClick={(event) => {
                  event.preventDefault();
                  goToFirstPage(page, lastPage);
                }}
                className={classes["pagination-button"]}
              >
                <Icon icon="step-backward" />
              </a>
            </li>
            <li
              className={classNames("waves-effect", {
                disabled: page === 1,
              })}
            >
              <a
                href="#!"
                onClick={(event) => {
                  event.preventDefault();
                  goToPreviousPage(page, lastPage);
                }}
                className={classes["pagination-button"]}
              >
                <Icon icon="chevron-left" />
              </a>
            </li>
            <li className={classes["pagination-item"]}>
              <input
                type="number"
                className="gc-page-input"
                value={page}
                onChange={(event) => pageChange(event, page, lastPage)}
                disabled={filteredTotalEntries === 0}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    forceSearch();
                  }
                }}
              />
            </li>
            <li
              className={classNames("waves-effect", {
                disabled: page === lastPage,
              })}
            >
              <a
                href="#!"
                onClick={(event) => {
                  event.preventDefault();
                  goToNextPage(page, lastPage);
                }}
                className={classes["pagination-button"]}
              >
                <Icon icon="chevron-right" />
              </a>
            </li>
            <li
              className={classNames("waves-effect", {
                disabled: page === lastPage,
              })}
            >
              <a
                href="#!"
                onClick={(event) => {
                  event.preventDefault();
                  goToLastPage(page, lastPage);
                }}
                className={classes["pagination-button"]}
              >
                <Icon icon="step-forward" />
              </a>
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
