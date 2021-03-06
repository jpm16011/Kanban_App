const path = require('path');

const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};


module.exports = {
// Entry accepts a path or an object of entries. We'll be using the
// latter form given it's convenient with more complex configurations.
	entry: {
		app: PATHS.app
},
	output: {
		path: PATHS.build,
		filename: 'bundle.js'
	}

	
};

const merge = require('webpack-merge');
const webpack = require('webpack'); 
const TARGET = process.env.npm_lifecycle_event;
const NpmInstallPlugin = require('npm-install-webpack-plugin'); 
process.env.BABEL_ENV = TARGET; 



const common = {
	entry: { 
		app: PATHS.app
	}, 
	// Add resolve.extensions.
	// '' is needed to allow imports without an extension 
	resolve: {
		extensions:['', '.js', '.jsx']
	}, 
	output: { 
		path: PATHS.build, 
		filename: 'bundle.js'
	}, 

	module: {
		loaders: [
			{
				test: /\.css$/, 
				loaders: ['style', 'css'], 
				include: PATHS.app
			}, 
			
			{
				test: /\.jsx?$/, 
				// Enable caching for improved performance during development 
				// It uses default OS directory by default  If you need something more custom 
				// pass a path to it.  I.e., babel?cacheDirectory=<path>
				loaders: ['babel?cacheDirectory'], 
				// Parse only app files! Without this it will go through the entire project.  
				// In addition to being slow, that will most likely result in an error. 
				include: PATHS.app
			}
		]  
	}
};  
	


// Default configuration 
if(TARGET === 'build') { 
	module.exports = merge(common, {}); 
}

if(TARGET === 'start' || !TARGET) { 

		module.exports = merge(common, {
			devtool: 'eval-source-map', 
			devServer: {
				contentBase: PATHS.build,
				// Enable history API fallback so HTML5 History API based
				// routing works. This is a good default that will come
				// in handy in more complicated setups.
				historyApiFallback: true,
				hot: true,
				inline: true,
				progress: true,
				// Display only errors to reduce the amount of output.
				stats: 'errors-only',
				// Parse host and port from env so this is easy to customize.
				//
				// If you use Vagrant or Cloud9, set
				// host: process.env.HOST || '0.0.0.0';
				//
				// 0.0.0.0 is available to all network devices unlike default
				// localhost
				host: process.env.HOST,
				port: process.env.PORT
			},
				plugins: [
					new webpack.HotModuleReplacementPlugin(), 
					new NpmInstallPlugin({
						save: true // --save
					})
				]
		});
}
