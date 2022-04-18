const fs = require('fs')
const path = require('path')

function treefn(dirpath){
    if (dirpath == undefined){
        console.log('Please Enter a valid command')
    }
    else{
        let doesExist = fs.existsSync(dirpath)
        if (doesExist == true){
            treehelper(dirpath , ' ')
        }
    }
}


function treehelper(targetpath , indent){
    let isFile = fs.lstatSync(targetpath).isFile()

    if(isFile == true){
        let filename = path.basename(targetpath)
        console.log(indent + "├──" + filename)
    }
    else{
        let dirname = path.basename(targetpath)
        console.log(indent + '└──' + dirname)

        let children = fs.readdirSync(targetpath)

        for (let i = 0; i<children.length; i++){
            let childPath = path.join(targetpath , children[i])
            treehelper(childPath, indent + " \t")
        }
    }


}

module.exports ={
    treekey : treefn
}