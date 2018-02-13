export const makeActionCreator = (type, ...argNames) => {
  return function(...args) {
    console.log(type, args);

    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};
