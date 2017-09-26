import genDiff from '../src/genDiffLib';

const expected = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';

test('json', () => {
  const pathToFile1 = `${__dirname}/json/before.json`;
  const pathToFile2 = `${__dirname}/json/after.json`;
  const jsonDiff = genDiff(pathToFile1, pathToFile2);
  expect(jsonDiff).toEqual(expected);
});
test('yaml', () => {
  const pathToFile1 = `${__dirname}/yaml/before.yaml`;
  const pathToFile2 = `${__dirname}/yaml/after.yaml`;
  const yamlDiff = genDiff(pathToFile1, pathToFile2);
  expect(yamlDiff).toEqual(expected);
});
test('ini', () => {
  const pathToFile1 = `${__dirname}/ini/before.ini`;
  const pathToFile2 = `${__dirname}/ini/after.ini`;
  const iniDiff = genDiff(pathToFile1, pathToFile2);
  expect(iniDiff).toEqual(expected);
});
