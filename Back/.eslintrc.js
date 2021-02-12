module.exports = {
    env: {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    extends: [
        "airbnb-base"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaVersion": 12
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        'linebreak-style': 0,
        'global-require': 0,
        'eslint linebreak-style': [0, 'error', 'windows'],
      },
};
