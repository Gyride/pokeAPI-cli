#!/usr/bin/env node

const clear = require('clear');
const figlet = require('figlet');
const asciify = require('asciify-image');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

clear();
console.log(
    figlet.textSync('PokemonAPI', { horizontalLayout: 'fitted' })
);

const inquirer = require('./lib/inquirer');

const run = () => {
    const choose = inquirer.askToChoose();

    choose.then( function(result) {
        if (result.choice == 'Pokemon') {
            const pokemon = inquirer.askWhichPokemon();
            pokemon.then( function(result) {
                P.getPokemonByName(result.name).then( function(response) {
                    console.log(
                        figlet.textSync(result.name, { horizontalLayout: 'fitted' })
                    );
                    asciify(response.sprites.front_default, { fit: 'box', width: 40, height: 20 })
                    .then(function (asciified) {
                        console.log(asciified);
                        console.log('\n')
                        response.types.forEach(function(Element) {
                            console.log(Element.type.name);
                        });
                        console.log('\n');
                        P.getPokemonSpeciesByName(result.name)
                        .then(function(response) {
                            const entry = response.flavor_text_entries.find( function(Element) {
                                return Element.language.name == "en";
                            });
                            console.log(entry.flavor_text);
                            process.exit();
                        }).catch(function(error) {
                        console.log('There was an ERROR: ', error);
                        });
                    }).catch(function (err) {
                        console.error(err);
                    });
                }).catch(function(error) {
                    console.log('There was an ERROR: ', error);
                });
            });
        } else if (result.choice == 'Moves') {
            const move = inquirer.askWhichMove();
            move.then( function(result) {
                P.getMoveByName(result.name).then( function(response) {
                    console.log(
                        figlet.textSync(response.name, { horizontalLayout: 'fitted' })
                    );
                    console.log(response.type.name);
                    console.log('\n')
                    console.log('Power: ' + response.power);
                    console.log('Accuracy :' + response.accuracy)
                    console.log('\n');
                    const entry = response.flavor_text_entries.find( function(Element) {
                        return Element.language.name == "en";
                    });
                    console.log(entry.flavor_text);
                    process.exit();
                }).catch(function(error) {
                    console.log('There was an ERROR: ', error);
                });
            });
        } else if (result.choice == 'Items') {
            const item = inquirer.askWhichItem();   
            item.then( function(result) {
                P.getItemByName(result.name).then( function(response) {
                    console.log(
                        figlet.textSync(response.name, { horizontalLayout: 'fitted' })
                    );
                    console.log('\n');
                    const entry = response.flavor_text_entries.find( function(Element) {
                        return Element.language.name == "en";
                    });
                    console.log(entry.text);
                    process.exit();
                }).catch(function(error) {
                    console.log('There was an ERROR: ', error);
                });
            });
        }
    });
}

run();