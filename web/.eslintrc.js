module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest/globals": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "babel",
    "jest",
  ],
  "rules": {
    "indent": [
      "error",
      2,
    ],
    "quotes": [
      "error",
      "single",
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-template-curly-in-string": "error",
    "array-callback-return": "error",
    "no-alert": "error",
    "camelcase": "warn",
    "no-duplicate-imports": "error",
    "prefer-template": "error",
    "keyword-spacing": "error",
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "arrow-spacing": "error",
    "comma-spacing": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": [
      "error",
      "never",
    ],
    "space-infix-ops": "error",
  },
  "settings": {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "version": "16.6.3",
    },
  },
  "overrides": [
    {
      "files": ["src/serviceWorker.js"],
      "rules": {
        "no-console": "warn",
      },
    },
  ]
};