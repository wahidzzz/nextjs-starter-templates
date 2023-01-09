#!/usr/bin/env node
import inquirer from 'inquirer';
import chalkPipe from 'chalk-pipe';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from "path"
import ora from 'ora';
import Box from 'cli-box';
import createDirectoryContents from './createDirectoryContents.js';
// import { exec } from "child_process"
const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

let templateName = "."
const CHOICES = fs.readdirSync(`${__dirname}/templates`);
// Set custom marks
const messageBox =
    new Box({
        w: 30,
        h: 7,
        stringify: false,
        stretch: true,
        hAlign: 'left',
        vAlign: 'top',
    }, `Next Steps\n - Install Dependencies\n - Test Project Scripts\n - Update Documentation\n - Change Project Details\n eg Name, Version, Specs`
    );
const QUESTIONS = [
    {
        name: 'template-choice',
        type: 'list',
        message: '👉 Which project template would you like to generate?',
        choices: CHOICES,
        default: "nextjs-apollo-client",
    },
    {
        name: 'include-testing',
        type: 'confirm',
        message: `🦺 Add Test Coverage with Jest, Playwright, react-testing-library ? ${chalkPipe('red.bold')('(BETA)')}`,
        choices: CHOICES,
        default: false,
    },
    {
        name: 'template-name',
        type: 'input',
        message: '👀 Project Name:',
        validate: function (input) {
            if (input === ".") {
                templateName = path.basename(path.resolve(process.cwd()))
                return true
            }
            if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
            else return '⚔️ Project name may only include letters, numbers, underscores and hashes.';
        },
        transformer: function (templateName) {
            return chalkPipe('green.bold')(templateName)
        }
    },
];
const spinner = ora({
    text: '🤞 Downloading Template'
})
inquirer.prompt(QUESTIONS)
    .then(answers => {
        if (answers['template-choice'] !== "nextjs-apollo-client") {
            console.log(chalkPipe("orange.bold")("Only ApolloClient can be installed, Other Templates are Coming Soon !!"));
            return false
        }
        const templateChoice = answers['template-choice'];
        templateName = answers['template-name'];
        const templatePath = `${__dirname}/templates/${templateChoice}`;
        if (templateName !== ".") {
            fs.mkdirSync(`${CURR_DIR}/${templateName}`);
        }
        const includeTesting = answers['include-testing']
        console.log(chalkPipe("green.bold")('🕊️ You are Ready to Fly'))
        // start processes
        setTimeout(() => {
            console.log("\n")
            spinner.start();
            createDirectoryContents(templatePath, templateName);
        }, 1000);
        setTimeout(() => {
            spinner.succeed()
        }, 2000);
        setTimeout(() => {
            spinner.color = 'yellow'
            spinner.start("🐕 Adding Husky")
            createDirectoryContents(`${__dirname}/husky`, templateName);
        }, 3000);
        setTimeout(() => {
            spinner.succeed()
        }, 4000);
        if (Boolean(includeTesting)) {
            setTimeout(() => {
                spinner.color = 'magenta'
                spinner.start("🧪 Adding Test Coverage")
                createDirectoryContents(`${__dirname}/testing`, templateName)
            }, 5000);
            setTimeout(() => {
                spinner.succeed()
                console.log(chalkPipe("green.bold")('🎉 Let\'s Get this party started!!'))
            }, 6000)
        }
        setTimeout(() => {
            console.log(messageBox.stringify());
        }, 7000)
        //! TODO: Package installation script
        // setTimeout(() => {
        //     spinner.color = 'green'
        //     spinner.start("Installing Packages")
        //     exec(`yarn install --modules-folder ./${templateName}`, (error, stdout, stderr) => {
        //         if (error) {
        //             spinner.fail(`error: ${error.message}`);
        //             return;
        //         }
        //         if (stderr) {
        //             spinner.fail(`stderr: ${stderr}`);
        //             return;
        //         }
        //         console.log("\n");
        //         spinner.succeed(`${stdout}`);
        //     });
        // }, 7000);
        // setTimeout(() => {
        //     spinner.stop()
        // }, 8000);

    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.log(chalkPipe('orange.bold')("😵 Prompt couldn't be rendered in the current environment"))
        } else {
            // Something else went wrong
            console.log(chalkPipe('red.bold')("❌ Somthing Went Wrong, Please Try again. Hint: Check if direct already exists"))
        }
    });