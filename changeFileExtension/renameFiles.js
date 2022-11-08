const path = require("path");
const fs = require("fs");
let filesList = [];

function getListOfFilesFromDir(dir) {
    fs.readdirSync(dir).forEach(fileOrDir => {
        const pathValue = path.join(dir, fileOrDir);
        fs.statSync(pathValue).isDirectory() ?
            getListOfFilesFromDir(pathValue) :
            filesList.push(pathValue);
    });
}

function renameFilesWithExtension(extension, typeOfRename) {
    filesList.forEach(file => fs.rename(
        file,
        typeOfRename(file, extension),
        (err) => {
            if (err) console.log(err);
        }
    ));
}

const addExtension = (fileName, extension) => fileName + extension;

// const dirPath = 'C:\\Users\\Amal Sunil\\Desktop\\dump';
const dirPath = __dirname + '/demo';

getListOfFilesFromDir(dirPath);
console.log('List of files: ', filesList);
renameFilesWithExtension('.md', addExtension);