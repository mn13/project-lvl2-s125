import * as def from './default';

const flow = (diff, render) => {
  const iter = (d, acc) => {
    const lines = d.map((item) => {
      const { type, name, property } = item;
      switch (type) {
        case 'nested': {
          const childrenLines = iter(property, render.next(acc));
          return render.getLineNested(name, childrenLines, acc);
        }
        case 'updated':
          return render.getLineUpdated(name, property, acc);
        case 'added':
          return render.getLineAdded(name, property, acc);
        case 'removed':
          return render.getLineRemoved(name, property, acc);
        case 'saved':
          return render.getLineSaved(name, property, acc);
        default:
          return '';
      }
    });
    return render.format(lines.join('\n'), acc);
  };
  return iter(diff, render.initial);
};

export default diff => flow(diff, def);
