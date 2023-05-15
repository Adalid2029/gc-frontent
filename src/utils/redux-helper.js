export const handleActions = (handlers, initialState) => {
  return (state, action) => {
    if (state === undefined) {
      return initialState;
    }

    if (handlers[action.type] !== undefined) {
      // we trust that we will add a function. We are skipping the extra step to check if this is a function
      // for optimizing
      return handlers[action.type](state, action);
    }

    return state;
  };
};
