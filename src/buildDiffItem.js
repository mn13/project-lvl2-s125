import DiffItem from './DiffItem';

const status = {
  saved: '', added: '+ ', cutted: '- ',
};

export default (key, value1, value2) => {
  if (value1 === value2) {
    return new DiffItem(status.saved, key, value1);
  }
  if (value1 === undefined) {
    return new DiffItem(status.added, key, value2);
  }
  if (value2 === undefined) {
    return new DiffItem(status.cutted, key, value1);
  }
  return [new DiffItem(status.added, key, value2), new DiffItem(status.cutted, key, value1)];
};
