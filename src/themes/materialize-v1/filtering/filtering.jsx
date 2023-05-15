import { useForm, useFieldArray, Controller } from "react-hook-form";
import i18n from "../../../utils/locale/i18n";
import React from "react";
import filteringSkin from "../skin/filtering/filtering.skin";
import { createUseStyles } from "react-jss";
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
import Button from "../buttons/button";

const useStyles = createUseStyles(filteringSkin);

const Filtering = (props) => {
  const {
    onFilteringModalClose,
    columns,
    onSubmit: onSubmitCallback,
    extendedSearchOperator,
    extendedSearchData,
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
        if (searchData !== null) {
          extendedSearch.push(searchData);
        }
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
        <button
          type="button"
          className="btn-close"
          data-dismiss="modal"
          aria-label="Close"
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
                <div className="col-md-3">
                  <Controller
                    render={({ field: { onChange, onBlur, value } }) => (
                      <select
                        onChange={(event) => {
                          const oldValues = {
                            ...getValues(`extended_search[${index}]`),
                          };
                          const newValue = event.target.value;

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

                          onChange(event);
                        }}
                        className="form-control form-select"
                        name={`extended_search[${index}].name`}
                        value={value}
                      >
                        {columns.map(
                          (column) =>
                            column.isSearchable && (
                              <option value={column.name} key={column.name}>
                                {column.displayAs}
                              </option>
                            )
                        )}
                      </select>
                    )}
                    name={`extended_search[${index}].name`}
                    control={control}
                    defaultValue={item.firstName} // make sure to set up defaultValue
                  />
                </div>
                <div className="col-md-3">
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
                <div className="col-md-5">
                  <Controller
                    render={({ field: { onChange, onBlur, value } }) => {
                      // null is an indication that we will not show an input
                      if (value === null) {
                        return null;
                      }

                      const { dataType, permittedValues } = column;

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
        <Button
          onClick={onFilteringModalClose}
          label={i18n.t("filtering_cancel")}
        />
        <button type="submit" className="btn green">
          {i18n.t("filtering_filter_text")}
        </button>
      </div>
    </form>
  );
};

export default Filtering;
