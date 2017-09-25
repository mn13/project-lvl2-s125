import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';

const getContent = pathToFile => parse(fs.readFileSync(pathToFile, 'utf-8'), path.extname(pathToFile));

const genDiff = (pathToFile1, pathToFile2) => {
  const content1 = getContent(pathToFile1);
  const content2 = getContent(pathToFile2);

  const union = _.union(Object.keys(content1), Object.keys(content2));
  const result = union.reduce((acc, key) => {
    if (content1[key] === content2[key]) {
      return `${acc}    ${key}: ${content1[key]}\n`;
    }
    if (key in content1 && key in content2) {
      return `${acc}  + ${key}: ${content2[key]}\n  - ${key}: ${content1[key]}\n`;
    }
    if (key in content1) {
      return `${acc}  - ${key}: ${content1[key]}\n`;
    }

    return `${acc}  + ${key}: ${content2[key]}\n`;
  }, '');

  return `{\n${result}}`;
};

export default genDiff;
