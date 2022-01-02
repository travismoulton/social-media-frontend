export default function checkValidityHandler(value, rules) {
  let isValid = true;

  if (rules.required) isValid = value.trim() !== '' && isValid;

  return isValid;
}
