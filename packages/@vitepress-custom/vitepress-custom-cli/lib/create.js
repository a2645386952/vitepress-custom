import fs from "fs-extra";
import path from "path";
import inquirer from 'inquirer';
import { exec } from "child_process";
import ora from 'ora';
export default async function (name, options) {
    const cwd = process.cwd();
    // 需要创建的目录地址
    const targetDir = path.join(cwd, name);
    const tempDir = path.join(cwd, 'tempDownload');
    fs.removeSync(`${tempDir}`);//删除temp文件夹
    // 目录是否已经存在？
    if (fs.existsSync(targetDir)) {

        // 是否为强制创建？
        if (options.force) {
            await fs.remove(targetDir);
        } else {
            // TODO：询问用户是否确定要覆盖
            // 询问用户是否确定要覆盖
            let { action } = await inquirer.prompt([
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
            ]);
            if (!action) {
                return;
            } else if (action === 'overwrite') {
                // 移除已存在的目录
                console.log(`\r\nRemoving...`);
                fs.removeSync(targetDir);
                console.log(`\r\nRemoved`);
                generate();
            }
        }
    } else {
        generate();
    }

    function generate() {
        const spinner = ora('Cloning...').start();
        const url = 'https://github.com/huyikai/vitepress-custom';
        const branch = 'master';
        exec(`git clone ${url} ${tempDir} && cd ${tempDir} && git checkout ${branch}`, (error, stdout, stderr) => {
            if (error) {
                console.log("error", error);
                process.exit();
            }

            fs.ensureDir(`${targetDir}`);
            fs.copySync(`${tempDir}/packages/vitepress-custom`, `${targetDir}`);
            fs.removeSync(`${targetDir}/.git`);//删除 .git 文件夹
            fs.removeSync(`${tempDir}`);//删除temp文件夹
            spinner.succeed('Complete');
            process.exit();
        });
    }
};
