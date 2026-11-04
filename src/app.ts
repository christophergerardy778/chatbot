import ollama from 'ollama';
import readline from 'node:readline/promises';

const chatHystory: { role: string; content: string }[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let continueChat = true;

async function main() {
    console.log("Bienvenido a Ollama Chat! Escribe 'exit' para salir.");
    
    do {
        const msg = await rl.question('You: ');

        if (msg.toLowerCase() === 'exit') {
            continueChat = false;
            rl.close();
            break;
        }

        chatHystory.push({
            role: 'user',
            content: msg,
        });

        const chatResponse = await ollama.chat({
            model: 'llama3.1:8b',
            messages: chatHystory,
        });

        chatHystory.push({
            role: 'assistant',
            content: chatResponse.message.content,
        });

        console.log(`Ollama: ${chatResponse.message.content}`);
    } while (continueChat);
}

await main();
