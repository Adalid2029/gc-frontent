import PropTypes from "prop-types";
import { createUseStyles } from "react-jss";
import datagridSkin from "./datagrid.skin";
import { useSelector } from "react-redux";

const useStyles = createUseStyles(datagridSkin);

const Datagrid = (props) => {
  const {
    DatagridWrapper,
    DatagridHeader,
    DatagridBody,
    DatagridFooter,
    DatagridTools,
    DatagridTitle,
    title,
  } = props;

  const classes = useStyles(props);
  const openInModal = useSelector((state) => state.configuration.openInModal);
  const formModalOpen = useSelector((state) => state.form.modalOpen);
  const hasDatagridTitle = useSelector(
    (state) => state.configuration.hasDatagridTitle
  );

  const showDatagrid = openInModal || !formModalOpen;

  return (
    <>
      {showDatagrid && (
        <>
          {hasDatagridTitle && <DatagridTitle title={title} />}
          <div className={classes["datagrid-loading"]}>
            <DatagridTools {...props} />
            <div className={classes["datagrid"]}>
              <DatagridWrapper {...props}>
                <DatagridHeader {...props} />
                <DatagridBody {...props} />
              </DatagridWrapper>
            </div>
            <DatagridFooter {...props} />
          </div>
        </>
      )}
    </>
  );
};

Datagrid.propTypes = {
  DatagridBody: PropTypes.func,
  DatagridFooter: PropTypes.func,
  DatagridHeader: PropTypes.func,
  DatagridTools: PropTypes.func,
  DatagridWrapper: PropTypes.func,
  hasActions: PropTypes.bool,
  rows: PropTypes.array,
};

export default Datagrid;
