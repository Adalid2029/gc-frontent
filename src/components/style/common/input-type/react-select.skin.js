const reactSelectSkin = {
  option: (baseStyles, { isSelected }) => ({
    ...baseStyles,
    backgroundColor: isSelected
      ? "var(--gc-selected-background-color)"
      : "#ffffff",
    color: isSelected ? "var(--gc-selected-text-color)" : "#181a1b",
    "&:hover": {
      backgroundColor: isSelected
        ? "var(--gc-selected-background-color)"
        : "#2684FF30",
    },
  }),
  control: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "var(--gc-input-background-color)",
    color: "var(--gc-default-text-color)",
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "var(--gc-input-background-color)",
    color: "var(--gc-default-text-color)",
  }),
};

export default reactSelectSkin;
