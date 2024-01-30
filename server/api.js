import dotenv from 'dotenv';
import  {ChatOpenAI } from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

dotenv.config();
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error('OPENAI_API_KEY not found in environment');
  process.exit(1);
}

const chatModel = new ChatOpenAI({
  openAIApiKey: openaiApiKey,
  //modelName: "gpt-4-1106-preview",
  //maxTokens: 128
  
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a translator from plain English to SQL."],
  ["user", "Convert the following natural language description into a SQL query:\n\nShow all all the elements in the table users"],
  ["assistant", "SELECT * FROM users;"],
  ["user", "Convert the following natural language description into a SQL query:\n\n${input}."],
]);

const outputParser = new StringOutputParser();

const generate = async (queryDescription) => {

  const llmChain = prompt.pipe(chatModel).pipe(outputParser);
  return llmChain.invoke({
    input: queryDescription,
  }).then((response) => {
    return response;
  });

}

export default generate;