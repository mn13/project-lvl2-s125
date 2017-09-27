import DiffItem from './DiffItem';

const statuses = {
  saved: '', added: '+ ', cutted: '- ',
};

export default (key, value1, value2) => {
  if (value1 === value2) {
    return new DiffItem(statuses.saved, key, value1);
  }
  if (value1 === undefined) {
    return new DiffItem(statuses.added, key, value2);
  }
  if (value2 === undefined) {
    return new DiffItem(statuses.cutted, key, value1);
  }
  return [new DiffItem(statuses.added, key, value2), new DiffItem(statuses.cutted, key, value1)];
};
