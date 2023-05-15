const MultipleButtons = ({ buttons, Button }) => {
  return (
    <>
      {buttons.map((button, index) => {
        return (
          <Button
            key={index}
            label={button.label}
            icon={button.iconName}
            href={button.url}
            newTab={button.newTab}
            link={true}
          />
        );
      })}
    </>
  );
};

export default MultipleButtons;
