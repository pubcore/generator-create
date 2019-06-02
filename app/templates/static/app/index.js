var Generator = require('yeoman-generator'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json'),
	{basename, resolve} = require('path')

updateNotifier({pkg}).notify()

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts)
	}
	initializing(){
		this.scope = basename(resolve(process.cwd(), '..'))
	}
	async prompting() {
		this.answers = await this.prompt([{
			type:'input', name:'name',
			message : 'Your project name',
			default : () => `@${this.scope}/${this.appname.replace(/\s+/g, '-')}`
		},{
			type:'input', name:'description',
			message: 'Package description',
		},{
			type:'input', name:'license',
			default: 'MIT',
			message: 'License',
		},{
			type:'input', name:'author',
			default: () => this.scope,
			message: 'Author',
		},{
			type:'input', name:'repository',
			message: 'Repository uri',
		}])
	}
	writing(){
		//beware handling of ignore files (should be not in template/static)
		// this.fs.copy(
		// 	this.templatePath('_gitignore'),
		// 	this.destinationPath('.gitignore')
		// )
		// this.fs.copy(
		// 	this.templatePath('_npmignore'),
		// 	this.destinationPath('.npmignore')
		// )
		// example for static files
		// this.fs.copy(
		// 	this.templatePath('static/**'),
		// 	this.destinationPath('.'),
		// 	{globOptions:{dot:true}}
		// )
		//
		// expample for files with replacements prams based on answers
		// this.fs.copyTpl(
		// 	this.templatePath('path-to-file-relative-to-template-dir'),
		// 	this.destinationPath('destintation-path-relative-to-package-root'),
		// 	{...(this.answers)}
		// )
	}
	install(){
		this.log('Install packages ...')
		this.npmInstall([
			'eslint', 'mocha', 'yeoman-test'
		], {'save-dev': true })
		this.npmInstall([
			'update-notifier'
		], {'save': true })
	}
}
