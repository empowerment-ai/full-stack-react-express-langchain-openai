const dotenv = require('dotenv');
const { OpenAI, ChatOpenAI } = require("@langchain/openai");
const { ChatPromptTemplate } = require( "@langchain/core/prompts");
const { StringOutputParser, JsonOutputParser } = require ("@langchain/core/output_parsers");


dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  console.error('OPENAI_API not found in environment');
  process.exit(1);
}

const chatModel = new ChatOpenAI({
    openAIApiKey: openaiApiKey,
  });

// chatModel.invoke("Write a SQL statement that retrieves all records from a user table").then((response) => {
//     console.log(response);
// });

const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are an expert on SQL.  Given the user text, return the SQL statement that answers the question.  Return only the SQL and nothing else."],
    ["user", "{input}"],
  ]);
  
const outputParser = new StringOutputParser();

const llmChain = prompt.pipe(chatModel).pipe(outputParser);
llmChain.invoke({
    input: "A sql statement to return all records from a table called users where user id is greater than 5",
  }).then((response) => {
    console.log(response);
  });
