const shell = require('shelljs');
const chalk = require('chalk');
const commander = require('commander');
const path = require('path');
const fs = require('fs');
const { parse } = require('react-docgen');
const package = require('../package.json');

const cwd = process.cwd();
const exclud = ['.less', '.md', '.css'];

commander
.command('markdown <dir>')
.version(package.version)
.option('-f, file [fileName]', 'markdown export directory')
.action(function(dir, cmd) {
    // react组件文件列表list
    const dirs = modules_list(path.resolve(cwd, dir));
    const mdPath = path.resolve(cwd, cmd.file);
    let isExitsMdPath = shell.find(mdPath);
    if (!isExitsMdPath.code) {
        console.log(chalk.green(`> 删除现有markdown文件夹`))
        console.log(chalk.green(`-----------------`))
        shell.rm('-rf', mdPath);
    }
    console.log(chalk.green(`> 创建markdown文件夹`))
    console.log(chalk.green(`-----------------`))
    shell.mkdir(mdPath);

    dirs.forEach(function(modulePath) {
        // 读取组件代码
        const code = fs.readFileSync(modulePath, 'utf-8');
        const mdCode = createMarkdownCode(code);
        console.log(chalk.green(`> 向 ${mdPath}文件夹中写入\n> ${mdCode.filename}.md`))
        console.log(chalk.green(`-----------------`))
        fs.writeFileSync(`${mdPath}/${mdCode.filename}.md`, mdCode.code);
    })
});

commander.parse(process.argv);

function modules_list(dir) {
    let target = path.resolve(cwd, dir),
        dirs = [],
        childs = findChild(target);
        childs.forEach(function(file) {
            let filePath = path.resolve(target, file);
            let state = fs.statSync(filePath);
            let isFix = exclud.indexOf(path.extname(filePath)) >=0;
            if (file == 'index.js' || isFix ) {
                return;
            }

            if (state && state.isDirectory()) {
                dirs = dirs.concat(modules_list(filePath));
            } else {
                dirs.push(filePath);
            }
        })
        return dirs;
}

function findChild(dir) {
    return shell.ls('-a', dir).filter(function(_, index) { return typeof index == 'number' });
}

function createMarkdownCode(code) {
    const Info = parse(code);
    let mdCode = `## ${Info.displayName}\n##### ${Info.description}\n\n`
    let propsInfo = `### Props 属性\n|名称|类型|默认值|注释|\n|:----|:----|:----|:----|\n`;
    let props = Info.props ? Object.entries(Info.props) : [];
    if (props.length !== 0) mdCode+=propsInfo;
    props.forEach(function(prop) {
        const   name = prop[0], 
                type = prop[1].type ? prop[1].type.name : '无',
                defaultValue = prop[1].defaultValue ? prop[1].defaultValue.value : '无',
                description = prop[1].description;
        mdCode+=`|${name}|${type}|${defaultValue}|${description}|\n`;
    })
    return {
        filename: Info.displayName,
        code: mdCode
    };
}