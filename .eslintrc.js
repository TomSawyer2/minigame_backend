module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 6,
        parser: 'babel-eslint'
    },
    plugins: ['prettier'],
    rules: {
        'no-debugger': 'off',
        'comma-dangle': [2, 'never'],
        "no-unused-vars": 'off' 
    }
};
