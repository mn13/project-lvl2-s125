const quote = (value) => {
  if (typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
};

const format = (property) => {
  if (property instanceof Object) {
    return 'complex value';
  }
  return `value: ${quote(property)}`;
};

const getCommonPart = (name, type) => `Property ${quote(name)} was ${type}`;

export const initial = [];

export const next = (parents, name) => [...parents, name];

export const getLineUpdated = (name, property, parents) => `${getCommonPart([...parents, name].join('.'), 'updated')}. From ${quote(property.before)} to ${quote(property.after)}`;

export const getLineAdded = (name, property, parents) => `${getCommonPart([...parents, name].join('.'), 'added')} with ${format(property)}`;

export const getLineRemoved = (name, property, parents) => `${getCommonPart([...parents, name].join('.'), 'removed')}`;

export const getLineNested = (name, children) => children.join('\n');

export const process = diff => diff.filter(({ type }) => type !== 'saved');
