import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';
import render from './render';

const getContent = pathToFile => parse(fs.readFileSync(pathToFile, 'utf-8'), path.extname(pathToFile));

const propertyActions = [
  {
    check: (before, after) => before === after,
    type: 'saved',
    process: _.identity,
  },
  {
    check: (before, after) => before instanceof Object && after instanceof Object,
    type: 'nested',
    process: (before, after, f) => f(before, after),
  },
  {
    check: (before, after) => after === undefined,
    type: 'removed',
    process: _.identity,
  },
  {
    check: before => before === undefined,
    type: 'added',
    process: (before, after) => _.identity(after),
  },
  {
    check: (before, after) => before !== after,
    type: 'updated',
    process: (before, after) => ({ before, after }),
  },
];

const buildNode = (name, type, property) => ({
  name, type, property,
});

const getPropertyAction = (arg1, arg2) => _.find(propertyActions, ({ check }) => check(arg1, arg2));

const genDiff = (content1, content2) => {
  const union = _.union(Object.keys(content1), Object.keys(content2));

  const diff = union
    .map((key) => {
      const {
        type, process,
      } = getPropertyAction(content1[key], content2[key]);
      return buildNode(key, type, process(content1[key], content2[key], genDiff));
    }, {});
  return diff;
};

export default (pathToFile1, pathToFile2, format = 'default') => {
  const diff = genDiff(getContent(pathToFile1), getContent(pathToFile2));
  return render[format](diff);
};
