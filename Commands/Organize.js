const fs = require('fs')
const path = require('path')

let types = {
    media: ["mp4", "mkv", "mp3", 'jpg'],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
    app: ["exe", "dmg", "pkg", "deb"],
}


function organizefn(dirpath){
    let destpath
    if (dirpath==undefined){
        console.log('Please Enter a valid Directory Path')
        return;
    }else{
        let doesExist = fs.existsSync(dirpath)
     //   console.log(doesExist)
    

     if (doesExist == true){
        destpath = path.join(dirpath , 'organized_files')

        if (fs.existsSync(destpath) == false){
            fs.mkdirSync(destpath)
        }else{
            console.log('This folder already exist')
        }
        
        }else{
            console.log('Please eneter a valid path')
        }

    }

 organizehelper(dirpath , destpath)
 

    


}

function organizehelper(src, dest){
    let childnames = fs.readdirSync(src) //get all the details of the folder
    // console.log(childnames)

    for(let i =0; i < childnames.length; i++){
        let childaddress = path.join(src, childnames[i])
        let isFile = fs.lstatSync(childaddress).isFile()
        // console.log(childaddress +' '+isFile)
        
        if (isFile==true){
            let fileCat = getCat(childnames[i])
            //  console.log(childnames[i] + ' belongs to ' + fileCat )

            sendFiles(childaddress, dest, fileCat)
        }
        

    }

    
}

function getCat(name){
    let ext = path.extname(name)
    ext = ext.slice(1)
    // console.log(ext)


    for (let type in types){
        let ctypeArr = types[type]
        //  console.log(ctypeArr)

        for(let i = 0; i<ctypeArr.length ;i++){
            if(ext == ctypeArr[i])

            return type
        }
    }

    return 'others'





}

function sendFiles(srcpath , dest, fileCat){
    let catpath = path.join(dest,fileCat)

    if (fs.existsSync(catpath) == false){
        fs.mkdirSync(catpath)
    }
    let filename = path.basename(srcpath)
    let destFilePath = path.join(catpath , filename)

    fs.copyFileSync(srcpath, destFilePath)
    fs.unlinkSync(srcpath)
}

module.exports ={
    organizekey : organizefn
}