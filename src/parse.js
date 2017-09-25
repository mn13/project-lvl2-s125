const parser = {
  '.json': data => JSON.parse(data),
};
export default (data, ext) => parser[ext](data);
