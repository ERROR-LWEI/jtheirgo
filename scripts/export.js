const shell = require('shelljs');
const chalk = require('chalk');
const commander = require('commander');
const path = require('path');
const fs = require('fs');
const package = require('../package.json');

const cwd = process.cwd();

commander
.command('export <dir>')
.version(package.version)
.option('-f, --file [fileName]', 'The target file to export')
.action(function(dir, cmd) {
    exportFunc(dir, cmd.file)
});

commander.parse(process.argv);


function exportFunc(dir, file) {
    if (typeof file === 'boolean') {
        console.log(chalk.red('Please enter the address of the export file'))
        shell.exit(1);
    }
    
    let code = '';

    const isExits = shell.find(path.resolve(cwd, file));

    if (!isExits.code) {
        console.log(chalk.green('> 删除原有文件'))
        console.log(chalk.green('-------------'))
        shell.rm(path.resolve(cwd, file))
    }

    shell.ls(path.resolve(cwd, `${dir}`)).forEach(function(file) {
        if (file !== 'index.js') {
            code += `export { default as ${file} } from "./${file}";\n\n`;
        }
    })

    console.log(chalk.green('> 创建新的导出入口文件'))
    console.log(chalk.green('-------------'))
    shell.touch(path.resolve(cwd, file));
    console.log(chalk.green('> 写入代码到导出文件'))
    console.log(chalk.green('-------------'))
    fs.writeFileSync(path.resolve(cwd, file), code, 'utf-8');
}