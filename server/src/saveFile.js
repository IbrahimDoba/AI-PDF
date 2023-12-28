const fs = require('fs');
const  path = require("path")

const saveMessage = async (globalPdfText, fileName, )  =>{
  // const filePath  =  path.join(destinationPath, fileName)
  // console.log(PdfText, "SAVEFILENAME")
  // Append the message to the file
  try {
    await fs.access(fileName);
    console.log("Index file already exists. Skipping the indexing process.");
    return;
  } catch (error) {
    // File doesn't exist, continue with the indexing process
  }
  fs.appendFile(fileName + ".txt", globalPdfText + '\n', (err) => {
    if (err) {
      console.error('Error saving message:', err);
    } else {
      console.log('Message saved successfully!');
    }
  });
}

// Example usage:



module.exports = { saveMessage };
export {};