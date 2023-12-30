"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require('fs');
// const path = require("path")
const saveMessage = (globalPdfText, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    // const filePath  =  path.join(destinationPath, fileName)
    // console.log(PdfText, "SAVEFILENAME")
    // Append the message to the file
    try {
        yield fs.access(fileName);
        console.log("Index file already exists. Skipping the indexing process.");
        return;
    }
    catch (error) {
        // File doesn't exist, continue with the indexing process
    }
    fs.appendFile(fileName + ".txt", globalPdfText + '\n', (err) => {
        if (err) {
            console.error('Error saving message:', err);
        }
        else {
            console.log('Message saved successfully!');
        }
    });
});
module.exports = { saveMessage };
