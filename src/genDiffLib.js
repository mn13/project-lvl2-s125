import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';

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

const render = (diff) => {
  const signs = { saved: ' ', added: '+', removed: '-' };

  const getLine = (indent, sign, name, prop) => `${' '.repeat(indent)}${sign} ${name}: ${prop}`;
  const iter = (d, indent) => {
    const lines = d.map((item) => {
      const {
        name, property, type, children,
      } = item;

      if (children.length > 0) {
        return getLine(indent, signs[type], name, iter(children, indent + 4));
      }
      if (type === 'updated') {
        return `${getLine(indent, signs.added, name, property.after)}\n${getLine(indent, signs.removed, name, property.before)}`;
      }
      if (property instanceof Object) {
        const parsedProp = Object.keys(property)
          .map(key => getLine(indent + 4, signs.saved, key, property[key]));
        return getLine(indent, signs[type], name, `{\n${parsedProp.join('\n')}\n${' '.repeat(indent + 2)}}`);
      }

      return getLine(indent, signs[type], name, property);
    });
    return `{\n${lines.join('\n')}\n${' '.repeat(indent - 2)}}`;
  };
  return iter(diff, 2);
};


export default (pathToFile1, pathToFile2) => {
  const diff = genDiff(getContent(pathToFile1), getContent(pathToFile2));
  return render(diff);
};
