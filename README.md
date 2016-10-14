# `Patient` with angular

## Start the product.
1. Install the node@4.5.0, You can see the detail on https://nodejs.org/en/.
2. Run the required node modules packages. On OSX & Linux, open the Terminal, and run `sh init.sh`. If you use the windows, please download the git or sourceTree. Then use these terminal tools to run `sh init.sh`.
3. Local debug mode. Run `gulp serve`. If the terminal not throw the error, then you open the browser(recommend the Chrome) and enter `http://localhost:30000` or `http://localhost:30000/doc.html`.
4. Publish mode. Run `gulp build` and copy all files in directory `dist` to web-server(Nginx or Apache) directory.

## How to mock the interface request.
1. cd the directory `mockServer` and run the shell `node server.js`. Then the Terminal will appear like this
```
debug: node web server connection successfully Express server listening on port 20000 !
```

### Now the product will running success. 
The API document and some useful methods, please look at https://github.com/mingyizhudao/wap-front/wiki#welcome-to-the-wap-front-wiki 
