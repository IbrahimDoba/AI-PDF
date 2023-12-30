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
const openai_1 = require("langchain/embeddings/openai");
const faiss_1 = require("langchain/vectorstores/faiss");
const openai_2 = require("langchain/llms/openai");
const chains_1 = require("langchain/chains");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const apiKey = process.env.APIKEY;
const QueryText = (question) => __awaiter(void 0, void 0, void 0, function* () {
    const embeddings = new openai_1.OpenAIEmbeddings({
        openAIApiKey: apiKey,
        // temperature: 0,
    });
    const vectorStore = yield faiss_1.FaissStore.load("./", embeddings);
    const model = new openai_2.OpenAI({ openAIApiKey: apiKey, temperature: 0 });
    const chain = new chains_1.RetrievalQAChain({
        combineDocumentsChain: (0, chains_1.loadQAStuffChain)(model),
        retriever: vectorStore.asRetriever(),
        returnSourceDocuments: true,
    });
    try {
        const res = yield chain.call({
            query: question,
        });
        console.log("TEXT HERE12");
        // console.log("RES DATA HERE",res.text);
        return res.text;
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = { QueryText };
