#!/usr/bin/env node
const program = require('commander');
const pjson = require('./package.json');
const init = require('./setup/commands/init');

program
  .version(pjson.version);

program
  .command('init')
  .description('Initialises Nebula CSS')
  .option('-d, --dirname <dirname>', 'SCSS Directory name')
  .action((program) => {
    init(program, __dirname);
  });

program.parse(process.argv);
