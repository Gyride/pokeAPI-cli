const inquirer = require('inquirer');

module.exports = {

    askToChoose: () => {
        const question = [
            {
                type: 'list',
                name: 'choice',
                message: 'What do you want to learn about?',
                choices: ["Pokemon", "Moves", "Items"]
            }
        ];
    return inquirer.prompt(question);
    },
    askWhichPokemon: () => {
        const question = [
            {
                name: 'name',
                message: 'What Pokemon do you want to know about?'
            }
        ];
    return inquirer.prompt(question);
    },
    askWhichMove: () => {
        const question = [
            {
                name: 'name',
                message: 'What move do you want to know about?'
            }
        ];
    return inquirer.prompt(question);
    },
    askWhichItem: () => {
        const question = [
            {
                name: 'name',
                message: 'What item do you want to know about?'
            }
        ];
    return inquirer.prompt(question);
    }
}