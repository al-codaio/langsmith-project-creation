import 'dotenv/config';
import OpenAI from "openai";
import { traceable } from "langsmith/traceable";
import { wrapOpenAI } from "langsmith/wrappers";
import { RunTree } from "langsmith";

const client = new OpenAI();

const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Hello!" },
];

const projectName = process.env.PROJECT_NAME || "My Project";

const traceableCallOpenAI = traceable(
  async (messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[], model: string) => {
    const completion = await client.chat.completions.create({
      model: model,
      messages: messages,
    });
    return completion.choices[0].message.content;
  },
  {
    run_type: "llm",
    name: "OpenAI Call Traceable",
    project_name: projectName,
  }
);

async function main() {
  try {
    // Call the traceable function
    const result = await traceableCallOpenAI(messages, "gpt-4o-mini");
    console.log("Traceable result:", result);

    // Create and use a RunTree object
    const rt = new RunTree({
      run_type: "llm",
      name: "OpenAI Call RunTree",
      inputs: { messages },
      project_name: projectName,
    });
    await rt.postRun();

    // Execute a chat completion and handle it within RunTree
    const chatCompletion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });
    
    rt.end({ outputs: chatCompletion });
    await rt.patchRun();
    
    console.log("RunTree result:", chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

main(); 