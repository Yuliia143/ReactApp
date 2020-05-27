module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',

    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module' // Allows for the use of imports
    },
    extends: [
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react'
    ],
    rules: {
        'func-names': 'off',
        'import/prefer-default-export': 'off',
        'no-underscore-dangle': 'off'
    }
};
