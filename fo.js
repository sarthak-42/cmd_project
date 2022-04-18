const fs = require('fs')
const path = require('path')
const help = require('./Commands/help')
const organize = require('./Commands/Organize')
const tree = require ('./Commands/tree')
let inputArr = process.argv.slice(2)





let command = inputArr[0]



switch(command){

    case 'tree' :
        tree.treekey(inputArr[1])
        break;
    case 'organize':
        organize.organizekey(inputArr[1])
        break;
    case 'help':
        help.helpkey()
        break;
    default :
    console.log('Please Enter A Valid Command')
    break;
    
}












