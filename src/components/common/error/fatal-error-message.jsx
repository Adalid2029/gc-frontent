const FatalErrorMessage = () => {
  return (
    <div style={{ padding: "10px", border: "1px solid red" }}>
      <p>Something went wrong!</p>

      <p>
        If you see this message... oh well... you shouldn't! This is an
        unexpected JavaScript error. We are showing this message instead of
        showing a completely blank page.
      </p>

      <p>
        For more info about the specific error, please open the browser console
        or speak with your IT administrator.
      </p>
    </div>
  );
};

export default FatalErrorMessage;
