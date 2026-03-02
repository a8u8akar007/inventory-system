const { spawn } = require('child_process');
const fs = require('fs');

const child = spawn('node', ['server.js']);

child.stdout.on('data', (data) => {
    fs.appendFileSync('server_output.log', data.toString());
});

child.stderr.on('data', (data) => {
    fs.appendFileSync('server_error.log', data.toString());
});

child.on('close', (code) => {
    fs.appendFileSync('server_output.log', `Child exited with code ${code}\n`);
});
