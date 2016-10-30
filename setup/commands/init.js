const fs = require('fs-extra');

module.exports = (program, rootDir) => {
  const destinationDirectory = program.dirname || 'scss';
  fs.copy(`${__dirname}/../resources`, `${rootDir}/${destinationDirectory}`);
};
