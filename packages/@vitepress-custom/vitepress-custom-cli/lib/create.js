import fs from "fs-extra";
import path from "path";
import inquirer from 'inquirer';
import { exec } from "child_process";
import ora from 'ora';
export default async function (answers) {
    // 解构输入信息：项目名、作者、是否新建目录
    const { name, author, newDir } = answers;
    console.log('name,author,newDir', name, author, newDir);
    // 获取当前工作目录
    const cwd = process.cwd();
    // 要创建的目录地址
    const targetDir = path.join(cwd, newDir ? name : '');
    const tempDir = path.join(cwd, 'tempDownload');
    fs.removeSync(tempDir);//删除temp文件夹
    console.log('targetDir', targetDir);
    if (newDir && fs.existsSync(targetDir)) {
        inquirer.prompt([
            {
                name: 'action',
                type: 'list',
                message: 'Target directory already exists Pick an action:',
                choices: [
                    {
                        name: 'Overwrite',
                        value: 'overwrite'
                    }, {
                        name: 'Cancel',
                        value: false
                    }
                ]
            }
        ]).then(res => {
            if (res.action === 'overwrite') {
                // 移除已存在的目录
                fs.removeSync(targetDir);
                fs.removeSync(tempDir);
                generate();
            }
            return;
        });
    } else {
        generate();
    }

    function generate() {
        console.log("generate");
        const spinner = ora('Cloning...').start();
        // const url = 'https://github.com/huyikai/vitepress-custom/.';
        const url = 'https://gitee.com/ryougi-shi-ki/ued-background-page-exercise.git';
        // const branch = 'master';
        const branch = 'dev';
        exec(`git clone ${url} ${tempDir} && cd ${tempDir} && git checkout ${branch}`, (error, stdout, stderr) => {
            if (error) {
                console.log("error", error);
                process.exit();
            }
            fs.ensureDir(tempDir);
            fs.copySync(`${tempDir}/`, `${targetDir}`);
            fs.removeSync(`${targetDir}/.git`);//删除 .git 文件夹
            fs.removeSync(tempDir);//删除temp文件夹
            spinner.succeed('\r\nComplete');
            process.exit();
        });
    }
};
