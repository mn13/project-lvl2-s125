import yaml from 'js-yaml';

const parser = {
  '.json': data => JSON.parse(data),
  '.yaml': data => yaml.safeLoad(data),
};
export default (data, ext) => parser[ext](data);
