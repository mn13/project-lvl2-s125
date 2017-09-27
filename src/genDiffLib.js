import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';
import buildDiffItem from './buildDiffItem';

const getContent = pathToFile => parse(fs.readFileSync(pathToFile, 'utf-8'), path.extname(pathToFile));

const genDiff = (pathToFile1, pathToFile2) => {
  const content1 = getContent(pathToFile1);
  const content2 = getContent(pathToFile2);

  const union = _.union(Object.keys(content1), Object.keys(content2));

  const diff = _.flatten(union
    .map(key => buildDiffItem(key, content1[key], content2[key])));

  const formattedDiff = diff.map(item => item.toString());

  return `{\n    ${formattedDiff.join('\n  ')}\n}`;
};

export default genDiff;
