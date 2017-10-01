const def = (diff) => {
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

const plain = (diff) => {
  const format = (val) => {
    if (typeof val === 'boolean') {
      return val;
    }
    return `'${val}'`;
  };

  const lines = diff.filter(({ type, property }) => type !== 'saved' && !(property instanceof Array))
    .map((item) => {
      const { // кавычки!!!
        name, property, type, children,
      } = item;
      const common = `Property ${format(name)} was ${type}`;
      if (type === 'updated') {
        return `${common}. From ${format(property.before)} to ${format(property.after)}`;
      }
      if (type === 'added') {
        return `${common} with value: ${format(property)}`;
      }
      if (type === 'removed') { return common; }
      return '';
    });
  return lines.join('\n');
};

export default { default: def, plain };
