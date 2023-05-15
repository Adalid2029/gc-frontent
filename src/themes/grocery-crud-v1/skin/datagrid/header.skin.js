const headerSkin = {
  "search-column": {
    "min-width": "160px",
    "& input[type=text], & input[type=search], & input[type=date], & input[type=datetime-local]":
      {
        display: "block",
        width: "100%",
        padding: "0.375rem 0.75rem",
        fontSize: "1rem",
        fontWeight: "400",
        lineHeight: "1.5",
        color: "#212529",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        border: "1px solid #ced4da",
        appearance: "none",
        borderRadius: "0.25rem",
        transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
      },
  },
};

export default headerSkin;
