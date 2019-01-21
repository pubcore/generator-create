var Generator = require('yeoman-generator'),
	updateNotifier = require('update-notifier'),
	pkg = require('../package.json')

updateNotifier({pkg}).notify()

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts)
	}
	initializing(){
	}
	async prompting() {
		this.answers = await this.prompt([{
			type: 'input', name: 'scope',
			message: 'Your scope (without @)',
		},{
			type    : 'input', name    : 'name',
			message : 'Your project name',
			default : ({scope}) => (scope ? `@${scope}/` : '')
				+ this.appname.replace(/\s+/g, '-')
		},{
			type: 'input', name: 'description',
			message: 'Package description',
		},{
			type: 'input', name: 'license', default: 'MIT',
			message: 'License',
		},{
			type: 'input', name: 'author', default: ({scope}) => scope,
			message: 'Author',
		},{
			type: 'input', name: 'repository',
			message: 'Repository uri',
		}])
	}
	writing(){
		this.fs.copy(
			this.templatePath('static/**/*'),
			this.destinationPath('.'),
			{globOptions:{dot:true}}
		)
		this.fs.copyTpl(
			this.templatePath('package-json'),
			this.destinationPath('./package.json'),
			{...(this.answers)}
		)
	}
	install(){
		this.log('Install packages ...')
		this.npmInstall([
			'eslint', 'mocha', 'yeoman-test', 'eslint-plugin-mocha'
		], {'save-dev': true })
		this.npmInstall([
			'update-notifier', 'yeoman-generator'
		], {'save': true })
	}
}
