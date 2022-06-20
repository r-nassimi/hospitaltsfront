const validationRule = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/i;

//according to the general rules for creating a login/username/password, the object must be at least 6 characters and have at least 1 symbol
export const validationObject = (str) => {
  return validationRule.test(str);
};