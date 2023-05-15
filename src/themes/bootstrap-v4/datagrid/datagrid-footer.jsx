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
    page: currentPage,
    pageChange,
    totalEntries,
    perPage,
    perPageChange,
    forceSearch,
    pagingLoading,
    pagingOptions,
    initError,
    onClearAllCache,
  } = props;

  if (initError) {
    return (
      <div className={classes["footer-error"]}>
        <p>
          Couldn't load initial data sorry 😞 . This message usually appears
          when the server is down or there is an error in the code! If the issue
          still persist, consider clearing the cache.
        </p>
        <p>
          <button className="btn btn-outline-dark" onClick={onClearAllCache}>
            Clear Cache
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className={classes.footer}>
      <div className={classes["footer-child"]}>
        {pagingOptions.length > 0 && (
          <div>
            <div>Show</div>
            <div>
              <select
                className={classes["per-page-dropdown"]}
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
        )}
      </div>
      <div className={classes["footer-child"]}>
        {pagingLoading && (
          <div>
            <div className={classes.loader} />
          </div>
        )}
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
            <li
              className={classNames("page-item", {
                disabled: currentPage === 1,
              })}
            >
              <button
                className={classes["page-link"]}
                onClick={() => goToFirstPage(currentPage, lastPage)}
              >
                <Icon icon="step-backward" />
              </button>
            </li>
            <li
              className={classNames("page-item", {
                disabled: currentPage === 1,
              })}
            >
              <button
                className={classes["page-link"]}
                onClick={() => goToPreviousPage(currentPage, lastPage)}
              >
                <Icon icon="chevron-left" />
              </button>
            </li>
            <li className="page-item">
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
            <li
              className={classNames("page-item", {
                disabled: currentPage === lastPage,
              })}
            >
              <button
                className={classes["page-link"]}
                onClick={() => goToNextPage(currentPage, lastPage)}
              >
                <Icon icon="chevron-right" />
              </button>
            </li>
            <li
              className={classNames("page-item", {
                disabled: currentPage === lastPage,
              })}
            >
              <button
                className={classes["page-link"]}
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
