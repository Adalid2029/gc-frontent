import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import DatagridContainer from "../containers/datagrid-container";
import { loadCSS } from "../utils/themes";
import ErrorContainer from "../containers/error-container";
import FatalErrorMessage from "./common/error/fatal-error-message";

const Main = (props) => {
  const {
    isMobileDevice,
    loadCssIcons,
    loadCssTheme,
    loadCssThirdParty,
    settings,
    skin,
    subjectPlural,
    theme,
    configurationSettings,
  } = props;

  const [dynamicComponents, setDynamicComponents] = useState({
    ColumnsModal: null,
    DatagridBody: null,
    DatagridCheckbox: null,
    DatagridFooter: null,
    DatagridHeader: null,
    DatagridTitle: null,
    DatagridTools: null,
    DatagridWrapper: null,
    DeleteMultipleModal: null,
    DeleteSingleModal: null,
    ErrorDialog: null,
    FilteringModal: null,
    FormDialog: null,
    GroupButtons: null,
  });
  const [fatalError, setFatalError] = useState(false);

  useEffect(() => {
    const { DatagridTitle } = dynamicComponents;

    // Only run useEffect when the components are not loaded
    if (DatagridTitle !== null) {
      return;
    }

    const loadThemeDynamically = (result) => {
      const {
        ColumnsModal,
        DatagridBody,
        DatagridCheckbox,
        DatagridFooter,
        DatagridHeader,
        DatagridTitle,
        DatagridTools,
        DatagridWrapper,
        DeleteMultipleModal,
        DeleteSingleModal,
        ErrorDialog,
        FilteringModal,
        FormDialog,
        GroupButtons,
      } = result.default;

      // Check if we are missing any component export
      let missingComponents = [];
      Object.keys(dynamicComponents).forEach((componentName) => {
        if (result.default[componentName] === undefined) {
          missingComponents.push(componentName);
        }
      });
      if (missingComponents.length > 0) {
        console.error(
          `Fatal error: The theme with name "${theme}" is not exporting the following components:`,
          missingComponents
        );
        setFatalError(true);
      }

      setDynamicComponents({
        ColumnsModal,
        DatagridBody,
        DatagridCheckbox,
        DatagridFooter,
        DatagridHeader,
        DatagridTitle,
        DatagridTools,
        DatagridWrapper,
        DeleteMultipleModal,
        DeleteSingleModal,
        ErrorDialog,
        FilteringModal,
        FormDialog,
        GroupButtons,
      });
    };

    try {
      if (loadCssIcons) {
        loadCSS("font-awesome-v5");
      }
      if (loadCssTheme) {
        loadCSS(theme, skin);
      }
      switch (theme) {
        case "bootstrap-v4":
          import("../themes/bootstrap-v4").then(loadThemeDynamically);
          break;
        case "bootstrap-v5":
          import("../themes/bootstrap-v5").then(loadThemeDynamically);
          break;
        case "metronic":
          import("../themes/metronic").then(loadThemeDynamically);
          break;
        case "grocery-crud-v1":
          import("../themes/grocery-crud-v1").then(loadThemeDynamically);
          break;
        case "materialize-v1":
          import("../themes/materialize-v1").then(loadThemeDynamically);
          break;
        case "tailwind-v2":
          import("../themes/tailwind-v2").then(loadThemeDynamically);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      setFatalError(true);
    }
  }, [theme, loadCssIcons, loadCssTheme, skin, dynamicComponents]);

  const {
    ColumnsModal,
    DatagridTitle,
    DeleteMultipleModal,
    DeleteSingleModal,
    ErrorDialog,
    FilteringModal,
    FormDialog,
  } = dynamicComponents;

  if (fatalError) {
    return <FatalErrorMessage />;
  }

  if (!DatagridTitle) {
    return null;
  }

  try {
    return (
      <>
        <DeleteMultipleModal {...props} />
        <DeleteSingleModal {...props} />
        <ErrorContainer
          ErrorDialog={ErrorDialog}
          isMobileDevice={isMobileDevice}
        />
        <FormDialog {...props} />
        <FilteringModal {...props} />
        <ColumnsModal {...props} />
        <DatagridContainer
          {...dynamicComponents}
          loadCssThirdParty={loadCssThirdParty}
          isMobileDevice={isMobileDevice}
          settings={settings}
          title={subjectPlural}
          configurationSettings={configurationSettings}
          skin={skin}
          theme={theme}
        />
      </>
    );
  } catch (error) {
    console.log(error);
    return <FatalErrorMessage />;
  }
};

Main.propTypes = {
  theme: PropTypes.oneOf([
    "bootstrap-v4",
    "bootstrap-v5",
    "metronic",
    "grocery-crud-v1",
    "materialize-v1",
    "tailwind-v2",
  ]),
  dataUrl: PropTypes.string,
  uniqueId: PropTypes.string,
  hasActions: PropTypes.bool,
};

export default Main;
