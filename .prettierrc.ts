import { type Config } from 'prettier';

const config: Config = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    plugins: ['@ianvs/prettier-plugin-sort-imports'],
    importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
    importOrderTypeScriptVersion: '5.0.0',
    overrides: [
        {
            files: '*.html',
            options: {
                parser: 'angular',
            },
        },
    ],
};

export default config;
