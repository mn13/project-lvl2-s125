import * as def from './default';
import * as plain from './plain';

const flow = (diff, render) => {
  const iter = (d, acc) => {
    const lines = render.process(d, acc).map((item) => {
      const { type, name, property } = item;
      switch (type) {
        case 'nested': {
          const children = iter(property, render.next(acc, name));
          return render.getLineNested(name, children, acc);
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
          return item;
      }
    });
    return lines;
  };
  return iter(diff, render.initial).join('\n');
};

export default (diff, format) => {
  if (format === 'json') {
    return JSON.stringify(diff).toString();
  }
  if (format === 'plain') {
    return flow(diff, plain);
  }
  return flow(diff, def);
};
