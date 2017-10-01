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
    getChildren: () => [],
    getProperty: _.identity,
  },
  {
    check: (before, after) => before instanceof Object && after instanceof Object,
    type: 'saved',
    getChildren: (before, after, f) => f(before, after),
    getProperty: (before, after) => ({ before, after }),
  },
  {
    check: (before, after) => after === undefined,
    type: 'removed',
    getChildren: () => [],
    getProperty: _.identity,
  },
  {
    check: before => before === undefined,
    type: 'added',
    getChildren: () => [],
    getProperty: (before, after) => _.identity(after),
  },
  {
    check: (before, after) => before !== after,
    type: 'updated',
    getChildren: () => [],
    getProperty: (before, after) => ({ before, after }),
  },
];

const buildNode = (name, property, type, children) => ({
  name, property, type, children,
});

const getPropertyAction = (arg1, arg2) => _.find(propertyActions, ({ check }) => check(arg1, arg2));

const genDiff = (content1, content2) => {
  const union = _.union(Object.keys(content1), Object.keys(content2));

  const diff = union
    .map((key) => {
      const {
        type, getProperty, getChildren,
      } = getPropertyAction(content1[key], content2[key]);
      return buildNode(
        key, getProperty(content1[key], content2[key]),
        type, getChildren(content1[key], content2[key], genDiff),
      );
    }, {});
  return diff;
};

export default (pathToFile1, pathToFile2, format = 'default') => {
  const diff = genDiff(getContent(pathToFile1), getContent(pathToFile2));
  return render[format](diff);
};
