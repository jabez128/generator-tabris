var generators = require("yeoman-generator");
var fs = require('fs');
var path = require('path');
var name,description,email,homepage,name_join;

module.exports = generators.Base.extend({
	constructor: function(){
		generators.Base.apply(this,arguments)
	},
	prompting: function () {
    var done = this.async();
    this.prompt([{
      type    : 'input',
	  name    : 'name',
	  message : 'Give a name for your tabris app(default name is tabris-starter): ',
    },{
      type    : 'input',
	  name    : 'description',
	  message : 'Description your app: '
    },{
      type    : 'input',
	  name    : 'email',
	  message : 'Input your email: '
    },{
      type    : 'input',
	  name    : 'homepage',
	  message : 'Input your homepage: '
    }],function (answers) {
    	name = answers.name || 'tabris-starter';
    	name_join = name.split(' ').join('_');
    	description = answers.description;
    	email = answers.email;
    	homepage = answers.homepage;
        done();
    }.bind(this));
  },
  path: function(){
  	this.destinationRoot(name_join);
  	var folder = this.destinationRoot();
  	//fs.mkdirSync(folder);
  	console.log(path.join(folder,'cordova'));
  	fs.mkdirSync(path.join(folder,'cordova'));
  },
  writing: function(){
  	this.fs.copyTpl(
  		this.templatePath('index.js'),
      	this.destinationPath('index.js'),
      	{}
  	);
  	this.fs.copyTpl(
  		this.templatePath('package.json'),
      	this.destinationPath('package.json'),
      	{name: name}
  	);
  	this.fs.copyTpl(
  		this.templatePath('config.xml'),
      	this.destinationPath('cordova/config.xml'),
      	{
      		name: name,
      		name_join: name_join,
      		email: email,
      		homepage: homepage,
      		description: description
      	}
  	);
  },
  end: function(){
  	console.log('start your tabris journey :)');
  }
})