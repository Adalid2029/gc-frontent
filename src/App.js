import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { JssProvider } from "react-jss";
import { PersistGate } from "redux-persist/integration/react";

import MainContainer from "./containers/main-container";
import { CSS_VARIABLE_PREFIX } from "./constants/prefix";
import FatalErrorMessage from "./components/common/error/fatal-error-message";
import { isMobileDevice } from "./utils/device-helper";

const createGenerateId = () => {
  let counter = 0;

  return (rule) => `gc-${rule.key}-${counter++}`;
};

const generateId = createGenerateId();

const App = (props) => {
  const {
    groceryCrudStore,
    groceryCrudPersistor,
    theme: themeProp, // if theme is defined as prop then we are not offering any dynamic implementation of the theme
    loadCssTheme,
    loadCssIcons,
    loadCssThirdParty,
    skin,
    settings,
    configurationSettings,
  } = props;

  const [theme, setTheme] = useState(
    themeProp || localStorage.getItem("gc-theme") || "bootstrap-v5"
  );

  // TODO: We will need to move this to a separate folder and have a better structure
  useEffect(() => {
    const prefix = CSS_VARIABLE_PREFIX;

    const headTag = document.getElementsByTagName("head")[0];
    const styleTag = document.createElement("style");
    styleTag.id = "gc-root-css-variables";

    const niceBlack = "#181a1b";
    const justWhite = "#ffffff";
    const selectedBackgroundColor = "#2684FF";

    if (skin === "dark") {
      styleTag.innerHTML = `\n:root { 
        ${prefix}border-separator-color: #383d3f;
        ${prefix}table-hover-background: #2b2f31;
        ${prefix}input-light-background: ${niceBlack};
        ${prefix}light-background: ${niceBlack};
        ${prefix}dark-background: #2b2f31;
        ${prefix}dark-background-text-color: #e8e6e3;
        ${prefix}default-background: #181a1b;
        ${prefix}default-text-color: #d1cdc;
        ${prefix}emphasis-background-color: #2394fd;
        ${prefix}emphasis-text-color: ${justWhite};
        ${prefix}selected-background-color: ${selectedBackgroundColor};
        ${prefix}selected-text-color: ${justWhite};
        ${prefix}input-background-color: #333333;
      }\n`;
    } else {
      styleTag.innerHTML = `\n:root { 
        ${prefix}border-separator-color: #dee2e6;
        ${prefix}table-hover-background: #dddddd;
        ${prefix}input-light-background: ${justWhite};
        ${prefix}light-background: ${justWhite};
        ${prefix}dark-background: #dddddd;
        ${prefix}dark-background-text-color: #212529;
        ${prefix}default-background: ${justWhite};
        ${prefix}default-text-color: #212529;
        ${prefix}emphasis-background-color: #2394fd;
        ${prefix}emphasis-text-color: ${justWhite};
        ${prefix}selected-background-color: ${selectedBackgroundColor};
        ${prefix}selected-text-color: ${justWhite};
        ${prefix}input-background-color: ${justWhite};
      }\n`;
    }

    headTag.appendChild(styleTag);
  }, [skin]);

  try {
    const MainContainerWithTheme = () => (
      <MainContainer
        isMobileDevice={isMobileDevice()}
        loadCssIcons={loadCssIcons}
        loadCssTheme={loadCssTheme}
        loadCssThirdParty={loadCssThirdParty}
        settings={settings}
        skin={skin}
        theme={theme}
        configurationSettings={configurationSettings}
      />
    );

    return (
      <>
        {groceryCrudPersistor ? (
          <JssProvider generateId={generateId}>
            <Provider store={groceryCrudStore}>
              <PersistGate loading={null} persistor={groceryCrudPersistor}>
                <MainContainerWithTheme />
              </PersistGate>
            </Provider>
          </JssProvider>
        ) : (
          <JssProvider generateId={generateId}>
            <Provider store={groceryCrudStore}>
              <MainContainerWithTheme />
            </Provider>
          </JssProvider>
        )}

        {themeProp ? null : (
          <div>
            <select
              value={theme}
              onChange={(event) => {
                localStorage.setItem("gc-theme", event.target.value);
                setTheme(event.target.value);
                window.location.reload();
              }}
              style={{
                display: "block",
                marginTop: "20px",
              }}
              className="form-control form-select"
            >
              <option value="bootstrap-v4">bootstrap-v4</option>
              <option value="bootstrap-v5">bootstrap-v5</option>
              <option value="metronic">metronic</option>
              <option value="grocery-crud-v1">grocery-crud-v1</option>
              <option value="materialize-v1">materialize-v1</option>
              <option value="tailwind-v2">tailwind-v2</option>
            </select>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.log(error);
    return <FatalErrorMessage />;
  }
};

export default App;
