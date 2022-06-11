/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { defaults: ts_preset } = require('ts-jest/presets')
const merge = require('merge')

module.exports = merge.recursive(ts_preset, {
    preset: '@shelf/jest-dynamodb',
    transform: ts_preset.transform,
    testEnvironment: 'node',
});