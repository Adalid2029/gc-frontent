import { connect } from "react-redux";
import ErrorDisplay from "../components/error/error-display";
import { errorActions } from "../actions/error-actions";

const mapStateToProps = (state, ownProps) => ({
  // From state
  summary: state.error.summary,
  message: state.error.message,
  details: state.error.details,

  // From ownProps
  ErrorDialog: ownProps.ErrorDialog,
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () =>
      dispatch({
        type: errorActions.MODAL_CLOSE,
      }),
  };
};

const ErrorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorDisplay);

export default ErrorContainer;
