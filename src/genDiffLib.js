import _ from 'lodash';

const genDiff = (content1, content2) => {
  const union = _.union(Object.keys(content1), Object.keys(content2));
  const result = union.reduce((acc, key) => {
    if (content1[key] === content2[key]) {
      return `${acc}    ${key}: ${content1[key]}\n`;
    }
    if (key in content1 && key in content2) {
      return `${acc}  + ${key}: ${content2[key]}\n  - ${key}: ${content1[key]}\n`;
    }
    if (key in content1) {
      return `${acc}  - ${key}: ${content1[key]}\n`;
    }

    return `${acc}  + ${key}: ${content2[key]}\n`;
  }, '');

  return `{\n${result}}`;
};

export default genDiff;
