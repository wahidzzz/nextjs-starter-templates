#!/usr/bin/env node
import inquirer from 'inquirer';
import chalkPipe from 'chalk-pipe';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import createDirectoryContents from './createDirectoryContents.js';

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
    {
        name: 'template-choice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES,
        default: "nextjs-apollo-client",
    },
    {
        name: 'template-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        },
        transformer: function (templateName) {
            return chalkPipe('green.bold')(templateName)
        }
    },
];

inquirer.prompt(QUESTIONS).then(answers => {
    const templateChoice = answers['template-choice'];
    const templateName = answers['template-name'];
    const templatePath = `${__dirname}/templates/${templateChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${templateName}`);

    createDirectoryContents(templatePath, templateName);
});