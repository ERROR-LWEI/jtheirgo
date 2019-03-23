/*
 * @Author: wei.liu 
 * @Date: 2019-03-23 15:12:23 
 * @Last Modified by: wei.liu
 * @use copyStyle
 * @Last Modified time: 2019-03-23 15:46:26
 */
const shell = require('shelljs');
const chalk = require('chalk');
const commander = require('commander');
const path = require('path');
const fs = require('fs');
const package = require('../package.json');

const cwd = process.cwd();

commander
.command('copystyle <dir>')
.version(package.version)
.option('-e, es [esFileName]', 'es module style file')
.option('-c, cmd [cmdFileName]', 'cmd module style file')
.action(function(dir, cmd) {
    const target = path.resolve(cwd, dir);
    const esModule = path.resolve(cwd, cmd.es);
    const cmdModule = path.resolve(cwd, cmd.cmd);
    shell.ls('-a',target).forEach(function(file, index) {
        console.log(file)
        if (file !== 'index.js') {
            const styleFile = path.resolve(`${target}/${file}`, 'styles/*');
            
            shell.cp(styleFile, path.resolve(esModule, `${file}/styles`));
            shell.cp(styleFile, path.resolve(cmdModule, `${file}/styles`));
        }
    })
});

commander.parse(process.argv);

