import dedent from 'dedent';
import yargs from 'yargs';
import { bootstrap } from '../main';

const argv = yargs
  .usage('Usage: $0 --port [port]')
  .example('$0 --port 3200', '')
  .options({
    port: {
      demandOption: true,
      type: 'number',
      describe: dedent(`port cho service listen`),
    },
  })
  .help().argv;

bootstrap(argv.port).catch(error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    console.log('Children Error', error.errors);
  }
  console.log(error.config || error.stack);
});
