const { createProxyMiddleware } = require('http-proxy-middleware');
const login = require('../api/login');
const firebaseConfig = require('../api/firebaseConfig');
const bodyParser = require('body-parser');

module.exports = function(app) {
  // Use Vercel serverless function directly for login
  app.post('/api/login', bodyParser.json(), login);
  
  // Use Vercel serverless function directly for firebase config
  app.get('/api/firebaseConfig', firebaseConfig);
  
  app.use('/api/airtableProxy', createProxyMiddleware({
    target: 'https://api.airtable.com',
    changeOrigin: true,
    pathRewrite: (path, req) => {
      // In Express, when using router/use, the mount path is stripped. path is like /v0/dummy-base/...
      return path.replace(/^\/v0\/[^\/?]+/, `/v0/${process.env.AIRTABLE_BASE_NAME}`);
    },
    on: {
      proxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Authorization', `Bearer ${process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN}`);
      }
    }
  }));
};
