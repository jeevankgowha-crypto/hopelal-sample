const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\jeevan k\\.gemini\\antigravity\\brain\\4bfe878c-49dc-4195-8f81-5e72c2eae95f\\.system_generated\\steps\\309\\content.md', 'utf8');
const match = content.match(/https:\/\/arogya[^"'\`]*/);
console.log(match ? match[0] : 'not found');
