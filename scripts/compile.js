const shell = require('shelljs');
const chalk = require('chalk');
const commander = require('commander');
const path = require('path');
const fs = require('fs');
const package = require('../package.json');

// 执行命令的路径
const cwd = process.cwd();

commander
.command('compile <dir>')
.version(package.version)
.option('-e, es [fileName]', 'es module export directory')
.option('-c, cmd [fileName]', 'cmd module export directory')
.action(function(dir, cmd) {
    // 原始模块目录
    const modulePath = path.resolve(cwd, dir);
    const isExitsModule = shell.find(modulePath);

    // 没有原始模块目录
    if (!!isExitsModule.code) {
        console.log(chalk.red(`> 模块目录 ${modulePath} 为空`))
        shell.exit(1);
    }

    // 操作命令集合,option参数数组
    const cmds = cmd.options.filter(function(opt) { 
        return opt.long !== '--version' && cmd[opt.long] && (typeof cmd[opt.long] !== 'boolean') 
    })
    .map(function(opt) { 
        return opt.long 
    });

    compileFunc(dir, cmd, cmds);
});

commander.parse(process.argv);

/**
 * babel编译函数
 * @param {*} dir 原始模块文件夹路径
 * @param {*} cmd 命令数据集合
 * @param {*} cmds option命令数组
 */
function compileFunc(dir, cmd, cmds) {

    while(cmds.length !== 0){
        const _cmd = cmds.shift();
        const isExits = shell.find(path.resolve(cwd, cmd[_cmd]));
        if(!isExits.code) {
            console.log(chalk.green(`> 已存在${cmd[_cmd]}文件夹，进行删除`))
            console.log(chalk.green('-------------'))
            shell.rm('-rf',path.resolve(cwd, cmd[_cmd]));
        }
        console.log(chalk.green(`> 创建${cmd[_cmd]}文件夹`))
        console.log(chalk.green('-------------'))
        shell.mkdir(path.resolve(cwd, cmd[_cmd]));

        console.log(chalk.green(`> 编译${_cmd}模块 >> ${cmd[_cmd]}文件夹`))
        console.log(chalk.green('-------------'))
        shell.exec(`babel --config-file ./${_cmd}.babelrc ${dir} -d ${cmd[_cmd]}`)
        copystyle(dir, cmd[_cmd], 'styles');
    }

}

function copystyle(dir, file, styleFile) {
    const target = path.resolve(cwd, file);
    const source = path.resolve(cwd, dir);
    shell.ls(source).forEach(function(_file) {
        const filePath = path.resolve(source, _file);
        const tarFilPath = path.resolve(target, `${_file}/${styleFile}`);
        const state = fs.statSync(filePath);
        if (state && state.isDirectory()) {
            console.log(chalk.green(`> 拷贝${_file}的样式文件到${_file}/${styleFile}`));
            console.log(chalk.green('-------------'))
            const _styles = path.resolve(filePath, styleFile);
            shell.ls(_styles).forEach(function(name) {
                const styleFileName = path.resolve(_styles, name);
                const suffix = path.extname(styleFileName);
                console.log(suffix)
                if (suffix !== '.js') {
                    shell.cp('-R', styleFileName, tarFilPath)
                }
            })
        }
    })
}