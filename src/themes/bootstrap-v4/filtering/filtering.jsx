import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { createUseStyles } from "react-jss";

import i18n from "../../../utils/locale/i18n";
import classNames from "classnames";

import filteringSkin from "../skin/filtering/filtering.skin";
import Icon from "../../../components/common/icon";
import { deepCloneArray } from "../../../utils/array-helper";
import {
  doTriggerFilterRefresh,
  doTriggerFilterValueRefresh,
  emptyFilterMapping,
  getFilterValueFromDataType,
} from "../../../utils/filtering-helper";
import FilterComparisonSelect from "../../../components/filtering/filter-comparison-select";
import {
  getJssNameFromType,
  getSearchInputComponent,
} from "../../../utils/field-types";
import ModalCloseButton from "../theme-common/modal-close-button";

const useStyles = createUseStyles(filteringSkin);

const Filtering = (props) => {
  const {
    onFilteringModalClose,
    columns,
    onSubmit: onSubmitCallback,
    extendedSearchOperator,
    extendedSearchData,
    loadCssThirdParty,
  } = props;

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      basic_operator: extendedSearchOperator || "AND",
      extended_search:
        extendedSearchData.length > 0
          ? extendedSearchData
          : [
              {
                name: columns[0].name,
                filter: "contains",
                value: "",
              },
            ],
    },
  });
  const { fields, append, remove, insert } = useFieldArray({
    control,
    name: "extended_search",
  });

  const classes = useStyles(props);

  const onSubmit = (data) => {
    if (onSubmitCallback) {
      // making sure that we are not sending any data by reference
      let extendedSearch = [];
      data["extended_search"].forEach((searchData) => {
        extendedSearch.push(searchData);
      });
      onSubmitCallback(
        deepCloneArray({
          ...data,
          extended_search: extendedSearch,
        })
      );
    }
  };
  const onError = (errors, e) => console.log(errors, e);

  const numberOfFields = fields.length;

  return (
    <form
      className="form-horizontal"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="modal-header">
        <h5 className="modal-title">{i18n.t("filtering_filter_text")}</h5>
        <ModalCloseButton
          className={classes["close-button"]}
          onClick={onFilteringModalClose}
        />
      </div>

      <div className="modal-body">
        <div className="row">
          <label className="col-md-3 control-label">
            {i18n.t("filtering_operator")} :
          </label>
          <div className="col-md-3">
            <Controller
              render={({ field: { onChange, onBlur, value } }) => (
                <select
                  name="basic_operator"
                  onChange={onChange}
                  className="form-control form-select"
                  defaultValue={value}
                >
                  <option value="AND">
                    {i18n.t("filtering_and_statement")}
                  </option>
                  <option value="OR">{i18n.t("filtering_or_statement")}</option>
                </select>
              )}
              name="basic_operator"
              control={control}
              defaultValue="AND"
            />
          </div>
        </div>
        <div>
          {fields.map((item, index) => {
            const columnName = getValues(`extended_search[${index}]`).name;

            const column = columns.find((column) => column.name === columnName);

            return (
              <div className={classes["filtering-row"]} key={item.id}>
                <div className="col-md-1">
                  <button
                    className="btn btn-outline-dark btn-block"
                    type="button"
                    onClick={() => remove(index)}
                    disabled={numberOfFields === 1}
                  >
                    <Icon icon="trash" />
                  </button>
                </div>
                <div
                  className={classNames(
                    "col-md-3",
                    classes["filtering-column"]
                  )}
                >
                  <Controller
                    render={({ field: { onChange, onBlur, value } }) => {
                      const name = `extended_search[${index}].name`;
                      const options = columns
                        .filter((column) => column.isSearchable)
                        .map((column) => ({
                          value: column.name,
                          label: column.displayAs,
                        }));
                      return (
                        <Select
                          onChange={(event) => {
                            const oldValues = {
                              ...getValues(`extended_search[${index}]`),
                            };
                            const newValue = event.value;

                            const oldColumn = columns.find(
                              (column) => column.name === oldValues.name
                            );
                            const newColumn = columns.find(
                              (column) => column.name === newValue
                            );

                            if (
                              doTriggerFilterRefresh(
                                oldColumn.dataType,
                                newColumn.dataType
                              )
                            ) {
                              remove(index);
                              insert(index, {
                                name: newValue,
                                filter: getFilterValueFromDataType(
                                  newColumn.dataType
                                ),
                                value: "",
                              });
                            }

                            onChange({ target: { name, value: event.value } });
                          }}
                          name={name}
                          value={options.filter(
                            (option) => option.value === value
                          )}
                          options={options}
                        />
                      );
                    }}
                    name={`extended_search[${index}].name`}
                    control={control}
                    defaultValue={item.firstName} // make sure to set up defaultValue
                  />
                </div>
                <div
                  className={classNames(
                    "col-md-3",
                    classes["filtering-column"]
                  )}
                >
                  <Controller
                    render={({ field: { onChange, value } }) => {
                      return (
                        <FilterComparisonSelect
                          onChange={(event) => {
                            const oldValues = {
                              ...getValues(`extended_search[${index}]`),
                            };
                            const newValue = event.target.value;
                            if (
                              doTriggerFilterValueRefresh(
                                oldValues.filter,
                                newValue
                              )
                            ) {
                              remove(index);
                              insert(index, {
                                name: oldValues.name,
                                filter: newValue,
                                // null is an indication to not show an input
                                value: emptyFilterMapping[newValue] ? null : "",
                              });
                            }

                            onChange(event);
                          }}
                          className="form-control form-select"
                          name={`extended_search[${index}].filter`}
                          value={value}
                          dataType={column.dataType}
                        />
                      );
                    }}
                    name={`extended_search[${index}].filter`}
                    control={control}
                    defaultValue={item.filter}
                  />
                </div>
                <div
                  className={classNames(
                    "col-md-5",
                    classes["filtering-column"]
                  )}
                >
                  <Controller
                    render={({
                      field: { onChange, onBlur, value: originalValue },
                    }) => {
                      // null is an indication that we will not show an input
                      if (originalValue === null) {
                        return null;
                      }

                      const { dataType, permittedValues } = column;

                      const displayAs =
                        typeof originalValue === "object"
                          ? originalValue.displayAs
                          : "";
                      const value =
                        typeof originalValue === "object"
                          ? originalValue.key
                          : originalValue;

                      const SearchInputComponent =
                        getSearchInputComponent(dataType);

                      return (
                        <SearchInputComponent
                          onChange={onChange}
                          onBlur={onBlur}
                          className={classes[getJssNameFromType(dataType)]}
                          name={`extended_search[${index}].value`}
                          value={value}
                          required={true}
                          permittedValues={permittedValues}
                          fieldName={column.name}
                          displayAs={displayAs}
                          loadCssThirdParty={loadCssThirdParty}
                        />
                      );
                    }}
                    name={`extended_search[${index}].value`}
                    control={control}
                    defaultValue={item.value}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={classes["filtering-row"]}>
          <div className="col-md-12">
            <button
              type="button"
              className="btn btn-default btn-outline-dark"
              onClick={() => {
                append({
                  name: columns[0].name,
                  filter: "contains",
                  value: "",
                });
              }}
            >
              <Icon icon="plus" />
              &nbsp;
              {i18n.t("filtering_add_more")}
            </button>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-default btn-outline-dark"
          data-dismiss="modal"
          onClick={onFilteringModalClose}
        >
          {i18n.t("filtering_cancel")}
        </button>
        <button
          type="submit"
          className="btn btn-success delete-multiple-confirmation-button"
        >
          {i18n.t("filtering_filter_text")}
        </button>
      </div>
    </form>
  );
};

export default Filtering;
