import { useSelector } from "react-redux";
import { useLayoutEffect, useRef } from "react";

const selectMasterDetailApiUrl = (state) => state.masterDetail.apiUrl;
const groceryCrudLoader = require("../../grocery-crud-loader").default;

const MasterDetail = ({ primaryKeyValue, skin, theme }) => {
  const apiUrl = useSelector(selectMasterDetailApiUrl);
  const datagridRef = useRef(null);

  useLayoutEffect(() => {
    if (datagridRef.current) {
      groceryCrudLoader(datagridRef.current, {
        hasCache: false,
      });
    }
  }, [datagridRef]);

  const uniqueId = Date.now();

  return (
    <div
      ref={datagridRef}
      className="grocery-crud"
      data-api-url={apiUrl}
      data-unique-id={uniqueId}
      data-skin={skin}
      data-theme={theme}
      data-master-primary-key-value={primaryKeyValue}
      data-load-css-theme="false"
      data-load-css-icons="false"
      data-load-css-third-party="false"
    ></div>
  );
};

export default MasterDetail;
