jest.mock('fs-extra');

const fs = require('fs-extra');

const valueFromPackage = require('./');

describe('@emdaer/plugin-value-from-package', () => {
  test('gets name from root package.json', async () => {
    fs.readFile.mockImplementation(async () => '{"name": "emdaer"}');
    expect(await valueFromPackage({ value: 'name' })).toBe('emdaer');
  });
  test('gets description from specified package.json', async () => {
    fs.readFile.mockImplementation(
      async () =>
        '{"description": "an emdaer plugin to add values from package.json"}'
    );
    expect(
      await valueFromPackage({
        value: 'description',
        path: '../',
      })
    ).toBe('an emdaer plugin to add values from package.json');
  });
  test('errors if value is not found specified package.json', () => {
    fs.readFile.mockImplementation(
      async () =>
        '{"description": "an emdaer plugin to add values from package.json"}'
    );
    return expect(
      valueFromPackage({
        value: 'name',
        path: '../',
      })
    ).rejects.toThrow('No value "name" found in ../package.json');
  });
});
