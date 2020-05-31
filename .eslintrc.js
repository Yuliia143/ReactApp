module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
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
        'no-shadow': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': 'off'
    }
};
