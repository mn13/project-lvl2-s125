import genDiff from '../src/genDiffLib';

const beforeJson = `${__dirname}/fixtures/before.json`;
const afterJson = `${__dirname}/fixtures/after.json`;
const beforeYaml = `${__dirname}/fixtures/before.yaml`;
const afterYaml = `${__dirname}/fixtures/after.yaml`;
const beforeIni = `${__dirname}/fixtures/before.ini`;
const afterIni = `${__dirname}/fixtures/after.ini`;
const beforeJsonDeep = `${__dirname}/fixtures/beforeDeep.json`;
const afterJsonDeep = `${__dirname}/fixtures/afterDeep.json`;
const beforeYamlDeep = `${__dirname}/fixtures/beforeDeep.yaml`;
const afterYamlDeep = `${__dirname}/fixtures/afterDeep.yaml`;
const beforeIniDeep = `${__dirname}/fixtures/beforeDeep.ini`;
const afterIniDeep = `${__dirname}/fixtures/afterDeep.ini`;

const expected = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';

test('json', () => {
  const jsonDiff = genDiff(beforeJson, afterJson);
  expect(jsonDiff).toEqual(expected);
});
test('yaml', () => {
  const yamlDiff = genDiff(beforeYaml, afterYaml);
  expect(yamlDiff).toEqual(expected);
});
test('ini', () => {
  const iniDiff = genDiff(beforeIni, afterIni);
  expect(iniDiff).toEqual(expected);
});

const expectedDeep = '{\n    common: {\n        setting1: Value 1\n      - setting2: 200\n        setting3: true\n      - setting6: {\n            key: value\n        }\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n    }\n    group1: {\n      + baz: bars\n      - baz: bas\n        foo: bar\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';

test('jsonDeep', () => {
  const jsonDiff = genDiff(beforeJsonDeep, afterJsonDeep);
  expect(jsonDiff).toEqual(expectedDeep);
});
test('yamlDeep', () => {
  const yamlDiff = genDiff(beforeYamlDeep, afterYamlDeep);
  expect(yamlDiff).toEqual(expectedDeep);
});
test('iniDeep', () => {
  const iniDiff = genDiff(beforeIniDeep, afterIniDeep);
  expect(iniDiff).toEqual(expectedDeep);
});
