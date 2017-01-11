//Entry point for the application.  
// Requires our component and renders it through DOM


var component = require('./component'); 
var app = document.createElement('div'); 

document.body.appendChild(app); 

app.appendChild(component()); 

