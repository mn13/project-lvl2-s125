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

const expectedAST = '{\n    common: {\n        setting1: Value 1\n      - setting2: 200\n        setting3: true\n      - setting6: {\n            key: value\n        }\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n    }\n    group1: {\n      + baz: bars\n      - baz: bas\n        foo: bar\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';

test('jsonDeep', () => {
  const pathToFile1 = `${__dirname}/json/beforeDeep.json`;
  const pathToFile2 = `${__dirname}/json/afterDeep.json`;
  const jsonDiff = genDiff(pathToFile1, pathToFile2);
  expect(jsonDiff).toEqual(expectedAST);
});
test('yamlDeep', () => {
  const pathToFile1 = `${__dirname}/yaml/beforeDeep.yaml`;
  const pathToFile2 = `${__dirname}/yaml/afterDeep.yaml`;
  const yamlDiff = genDiff(pathToFile1, pathToFile2);
  expect(yamlDiff).toEqual(expectedAST);
});
test('iniDeep', () => {
  const pathToFile1 = `${__dirname}/ini/beforeDeep.ini`;
  const pathToFile2 = `${__dirname}/ini/afterDeep.ini`;
  const iniDiff = genDiff(pathToFile1, pathToFile2);
  expect(iniDiff).toEqual(expectedAST);
});
