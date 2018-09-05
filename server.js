/*const userApi = require('./api/userApi');*/
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const resolve = file =>path.resolve(__dirname, file)
const express = require('express')
const renderer = require('vue-server-renderer').createRenderer()
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Server-Side Bundle File

const createApp = require('./dist/bundle.server.js')['default']

// Client-Side Bundle File
const clientBundleFileUrl = '/bundle.client.js'
app.use('/', express.static(__dirname + '/dist'))

app.get('*', (req, res) => {

  	const context = { url: req.url }
  
	  createApp(context).then(app => {
		    renderer.renderToString(app, (err, html) => {
		        if (err){
				        res.status(500).send(`
				            <h1>Error: ${err.message}</h1>
				            <pre>${err.stack}</pre>
				        `)
		        } else {
		        /*
		         * <script src="${clientBundleFileUrl}"></script>
		         	<script>window.__INITIAL_STATE__ = ${JSON.stringify(context.state)}</script>
		         	* 
		         	* */
			        res.send(`
			            <!DOCTYPE html>
			            <html>
					            <head>
					                <meta charset="utf-8">
					                <title>不疯魔不成活</title>
					            </head>
					            <body>
					                <div id="app">
					                		${html}
					                </div>
					            </body>
			            </html>`
			        )
		        }
		    });
	  }, err => {
		    if (err.code === 404) {
		        res.status(404).end('Page not found')
		    } else {
		        res.status(500).end('Internal Error')
		    }
	  })

})

// Start server
app.listen(8081,()=>{
	console.log('8081 -- 不疯魔不成活')
});


