/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-idiomatic-order",
    "stylelint-prettier/recommended",
  ],
  rules: {
    "selector-class-pattern": null,
    "at-rule-no-unknown": null,
  },
};
