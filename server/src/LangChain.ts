import { config } from "dotenv";
config();

const apiKey = process.env.APIKEY

// INDEXES
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { FaissStore } = require("langchain/vectorstores/faiss");


const path = require("path");

const Indexes = async (IndexFileName:any) => {
  const directoryPath = path.join(__dirname, '..');
  const fullPath = path.join(directoryPath, IndexFileName);

  // Check if the file exists
  // try {
  //   await fs.access(fullPath);
  //   console.log("Index file already exists. Skipping the indexing process.");
  //   return;
  // } catch (error) {
  //   // File doesn't exist, continue with the indexing process
  // }

  const loader = new TextLoader(fullPath);
  const docs = await loader.load();

  const splitter = new CharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 50,
  });

  const documents = await splitter.splitDocuments(docs);
  // console.log("INDEXES WORKS", documents);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: apiKey,
    temperature: 0,
  });

  const vectorstore = await FaissStore.fromDocuments(documents, embeddings);
  await vectorstore.save("./");

};


module.exports = { Indexes };







