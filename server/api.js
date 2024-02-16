import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";
import { ChatOpenAI } from "@langchain/openai";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

dotenv.config();
const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  console.error('OPENAI_API_KEY not found in environment');
  process.exit(1);
}

const datasource = new DataSource({
  type: "sqlite",
  database: "Chinook.db",
});

const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
});

const prompt =
  PromptTemplate.fromTemplate(`Based on the table schema below, write a SQL query that would answer the user's question. Return just the SQL and nothing else:
{schema}

Question: {question}
SQL Query:`);

const model = new ChatOpenAI({
    //openAIApiKey: openaiApiKey,
    //modelName: "gpt-4-1106-preview",
    //maxTokens: 128
});

// The `RunnablePassthrough.assign()` is used here to passthrough the input from the `.invoke()`
// call (in this example it's the question), along with any inputs passed to the `.assign()` method.
// In this case, we're passing the schema.
const sqlQueryGeneratorChain = RunnableSequence.from([
  RunnablePassthrough.assign({
    schema: async () => db.getTableInfo(),
  }),
  prompt,
  model.bind({ stop: ["\nSQLResult:"] }),
  new StringOutputParser(),
]);

const generate = async (queryDescription) => {

    const finalResponsePrompt =
    PromptTemplate.fromTemplate(`Based on the table schema below, question, sql query, and sql response, write a natural language response:
    {schema}

    Question: {question}
    SQL Query: {query}
    SQL Response: {response}`);

    const fullChain = RunnableSequence.from([
    RunnablePassthrough.assign({
        query: sqlQueryGeneratorChain,
    }),
    {
        schema: async () => db.getTableInfo(),
        question: (input) => input.question,
        query: (input) => input.query,
        response: (input) => db.run(input.query),
    },
    finalResponsePrompt,
    model,
    ]);

    const finalResponse = await fullChain.invoke({
    question: `${queryDescription}?`,
    });

    return finalResponse.content;
}

export default generate;