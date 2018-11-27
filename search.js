
var counter = 0;
var inputExt, inputText;
process.argv.forEach(function (val, index, array) {
    counter++;
});


if (counter < 4) {
    console.log("USAGE: node search [EXT] [TEXT]");
} else {
    inputExt = process.argv[2];
    inputText = process.argv[3];


    var path = require('path'), fs = require('fs');

    function fromDir(startPath, filter, callback) {
        var files = fs.readdirSync(startPath);
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory()) {
                fromDir(filename, filter, callback);
            } else if (filter.test(filename))
                callback(filename);
        };
    };

    var filesFound = [];

    var fileExt = "\." + inputExt + "$";
    var re = new RegExp(fileExt, "");
    fromDir(__dirname, re, function (filename) {
        filesFound.push(filename);
    });

    var fsTextSearch = require('fs');
    var i = 0;
    var matchingFilesCounter = 0;
    var data;
    for (i; i < filesFound.length; i++) {
        data = fs.readFileSync(filesFound[i]);
        if (data.indexOf(inputText) >= 0) {
            console.log(filesFound[i]);
            matchingFilesCounter++;
        }
    }
    if (matchingFilesCounter == 0) {
        console.log("No file was found");
    }


}
