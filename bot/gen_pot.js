const { generate } = require('youtube-po-token-generator');

async function main() {
  try {
    console.log('Generating PO Token...');
    const { poToken, visitorData } = await generate();
    console.log(JSON.stringify({ poToken, visitorData }));
  } catch (err) {
    console.error('Error generating token:', err);
    process.exit(1);
  }
}

main();
