const Checkbox = ({ onChange, checked }) => {
  return (
    <>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span />
    </>
  );
};

export default Checkbox;
