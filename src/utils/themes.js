const assetsUrl =
  window?.GroceryCrudConfiguration?.assetsUrl || "http://localhost:3000/";

const themeMapping = {
  "bootstrap-v4": {
    url: `${assetsUrl}css/bootstrap-v4/bootstrap.css`,
  },
  "bootstrap-v5": {
    dark: `${assetsUrl}css/bootstrap-v5/bootstrap-dark.css`,
    mini: `${assetsUrl}css/bootstrap-v5/bootstrap-mini.css`,
    url: `${assetsUrl}css/bootstrap-v5/bootstrap.min.css`,
  },
  metronic: {
    // dark: `${assetsUrl}css/metronic/bootstrap-dark.css`,
    // mini: `${assetsUrl}css/metronic/bootstrap-mini.css`,
    url: `${assetsUrl}css/metronic/style.bundle.css`,
  },
  "grocery-crud-v1": {
    url: "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap-reboot.css",
  },
  "materialize-v1": {
    url: "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
  },
  "tailwind-v2": {
    url: "https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css",
  },
  "font-awesome-v5": {
    url: `${assetsUrl}icons/font-awesome-v5/css/all.min.css`,
  },
  "react-datepicker": {
    url: `${assetsUrl}css/react-datepicker/react-datepicker.min.css`,
  },
  "react-quill-v2": {
    url: `${assetsUrl}/css/react-quill-v2/quill.snow.css`,
  },
};

export const loadCSS = (themeName, skinName) => {
  const cssId = `gc-css-${themeName}`;

  // Make sure that the theme doesn't already exist and that we actually have the theme listed
  if (!document.getElementById(cssId) && themeMapping[themeName]) {
    const head = document.getElementsByTagName("head")[0];
    const link = document.createElement("link");
    const theme = themeMapping[themeName];
    link.id = cssId;
    link.rel = "stylesheet";
    link.referrerpolicy = "no-referrer";
    if (skinName && theme[skinName]) {
      link.href = theme[skinName];
    } else {
      link.href = theme.url;
    }

    head.appendChild(link);
  }
};
