import datagridReducer from "./datagrid-reducer";
import datagridRowsReducer from "./datagrid-rows-reducer";
import filteringReducer from "./filtering-reducer";
import formsReducer from "./forms-reducer";
import configurationReducer from "./configuration-reducer";
import loadingReducer from "./loading-reducer";
import { combineReducers } from "redux";
import columnsReducer from "./columns-reducer";
import errorReducer from "./error-reducer";
import dependedRelation from "./depended-relation";
import columnWidthReducer from "./column-width-reducer";
import masterDetailReducer from "./master-detail-reducer";

const groceryCrudReducers = combineReducers({
  columnWidth: columnWidthReducer,
  columns: columnsReducer,
  configuration: configurationReducer,
  datagrid: datagridReducer,
  datagridRows: datagridRowsReducer,
  dependedRelation: dependedRelation,
  error: errorReducer,
  filtering: filteringReducer,
  form: formsReducer,
  loading: loadingReducer,
  masterDetail: masterDetailReducer,
});

export default groceryCrudReducers;
