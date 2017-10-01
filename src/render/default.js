
export const format = (rendered, indent) => `{\n${rendered}\n${' '.repeat(indent - 2)}}`;

export const initial = 2;

export const next = indent => indent + 4;

const signs = { saved: ' ', added: '+', removed: '-' };

const getLine = (indent, sign, name, prop) => `${' '.repeat(indent)}${sign} ${name}: ${prop}`;

const getLineObject = (indent, property) => {
  const parsedProp = Object.keys(property)
    .map(key => getLine(next(indent), signs.saved, key, property[key]));
  return `{\n${parsedProp.join('\n')}\n${' '.repeat(indent + 2)}}`;
};

const getLineCommon = (indent, sign, name, property) =>
  getLine(indent, sign, name, property instanceof Object ?
    getLineObject(indent, property) : property);

export const getLineNested = (name, property, indent) =>
  getLine(indent, signs.saved, name, property);

export const getLineUpdated = (name, property, indent) =>
  `${getLineCommon(indent, signs.added, name, property.after)}\n${getLineCommon(indent, signs.removed, name, property.before)}`;

export const getLineAdded = (name, property, indent) =>
  getLineCommon(indent, signs.added, name, property);

export const getLineRemoved = (name, property, indent) =>
  getLineCommon(indent, signs.removed, name, property);

export const getLineSaved = (name, property, indent) =>
  getLineCommon(indent, signs.saved, name, property);
