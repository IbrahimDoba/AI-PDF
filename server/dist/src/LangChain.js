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
Object.defineProperty(exports, "__esModule", { value: true });
const apiKey = "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";
// INDEXES
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { CharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { FaissStore } = require("langchain/vectorstores/faiss");
const path = require("path");
const Indexes = (IndexFileName) => __awaiter(void 0, void 0, void 0, function* () {
    const directoryPath = path.join(__dirname, '..');
    const fullPath = path.join(directoryPath, IndexFileName);
    // Check if the file exists
    try {
        yield fs.access(fullPath);
        console.log("Index file already exists. Skipping the indexing process.");
        return;
    }
    catch (error) {
        // File doesn't exist, continue with the indexing process
    }
    const loader = new TextLoader(fullPath);
    const docs = yield loader.load();
    const splitter = new CharacterTextSplitter({
        chunkSize: 300,
        chunkOverlap: 50,
    });
    const documents = yield splitter.splitDocuments(docs);
    // console.log("INDEXES WORKS", documents);
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: apiKey,
        temperature: 0,
    });
    const vectorstore = yield FaissStore.fromDocuments(documents, embeddings);
    yield vectorstore.save("./");
});
module.exports = { Indexes };
// USESTORES
// import { config } from "dotenv";
// config();
