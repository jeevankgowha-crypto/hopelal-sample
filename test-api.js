const http = require('https');
const data = JSON.stringify({ email: "admin@arigya.local", password: "ChangeMe@123" });

const options = {
  hostname: 'arogya-hospital-1mg7.onrender.com',
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => console.log(`Status: ${res.statusCode}, Body: ${body}`));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();
