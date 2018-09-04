//index.js----Express服务器入口文件
// node 后端服务器
/*const userApi = require('./api/userApi');*/
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const resolve = file =>path.resolve(__dirname, file)
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const { createBundleRenderer } = require('vue-server-renderer');


const bundleRenderer = createBundleRenderer(
  // Load the SSR bundle with require.
  require('./dist/vue-ssr-bundle.json'),
  {
    // Yes, I know, readFileSync is bad practice. It's just shorter to read here.
    template: fs.readFileSync('./index.server.html', 'utf-8')
  }
);

app.use('/dist', express.static('dist'));

// Render all other routes with the bundleRenderer.
app.get('*', (req, res) => {
  bundleRenderer
    // Renders directly to the response stream.
    // The argument is passed as "context" to main.server.js in the SSR bundle.
    .renderToStream({url: req.path})
    .pipe(res);
});

app.listen(8081,()=>{
	console.log('不疯魔不成活-8081')
});