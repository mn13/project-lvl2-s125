import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';

const getContent = pathToFile => parse(fs.readFileSync(pathToFile, 'utf-8'), path.extname(pathToFile));

const status = {
  saved: ' ', added: '+', removed: '-', changed: '+-',
};

const propertyActions = [
  {
    check: (prop1, prop2) => prop1 === prop2,
    getStatus: status.saved,
    getProperty: _.identity,
  },
  {
    check: (prop1, prop2) => prop1 instanceof Object && prop2 instanceof Object,
    getStatus: status.saved,
    getProperty: (prop1, prop2, f) => f(prop1, prop2),
  },
  {
    check: (prop1, prop2) => prop2 === undefined,
    getStatus: status.removed,
    getProperty: (prop1, prop2, f) => {
      if (prop1 instanceof Object) return f(prop1, prop1);
      return prop1;
    },
  },
  {
    check: prop1 => prop1 === undefined,
    getStatus: status.added,
    getProperty: (prop1, prop2, f) => {
      if (prop2 instanceof Object) return f(prop2, prop2);
      return prop2;
    },
  },
  {
    check: (prop1, prop2) => prop1 !== prop2,
    getStatus: status.changed,
    getProperty: (prop1, prop2) => [prop1, prop2],
  },
];

const getPropertyAction = (arg1, arg2) => _.find(propertyActions, ({ check }) => check(arg1, arg2));

const genDiff = (content1, content2) => {
  const union = _.union(Object.keys(content1), Object.keys(content2));

  const diff = union
    .reduce((acc, key) => {
      const { getStatus, getProperty } = getPropertyAction(content1[key], content2[key]);
      const item = getStatus === status.changed ? { [`${status.added} ${key}`]: content2[key], [`${status.removed} ${key}`]: content1[key] } :
        { [`${getStatus} ${key}`]: getProperty(content1[key], content2[key], genDiff) };
      return { ...acc, ...item };
    }, {});
  return diff;
};
const format = (diff) => {
  const next = indent => indent + 4;

  const iter = (d, indent) => {
    const res = Object.keys(d)
      .reduce((acc, key) => {
        const property = d[key] instanceof Object ? iter(d[key], next(indent)) : d[key];
        return `${acc}${' '.repeat(indent)}${key}: ${property}\n`;
      }, '');
    return `{\n${res}${' '.repeat(indent - 2)}}`;
  };
  return iter(diff, 2);
};


export default (pathToFile1, pathToFile2) => {
  const diff = genDiff(getContent(pathToFile1), getContent(pathToFile2));
  return format(diff);
};
