const Generator = require('yeoman-generator'),
	{basename, resolve} = require('path')

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts)
	}
	initializing(){
		this.scope = basename(resolve(process.cwd(), '..'))
		this.localName = this.appname.replace(/\s+/g, '-')
	}
	async prompting() {
		this.answers = await this.prompt([{
			type    : 'input', name    : 'name',
			message : 'Your project name',
			default : () => `@${this.scope}/${this.localName}`
		},{
			type: 'input', name: 'description',
			message: 'Package description',
		},{
			type: 'input', name: 'license', default: 'MIT',
			message: 'License',
		},{
			type: 'input', name: 'author', default: () => this.scope,
			message: 'Author'
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
		this.spawnCommandSync('npm', ['i', '--save-dev', 'eslint', 'mocha', 'yeoman-test'])
		this.spawnCommandSync('npm', ['i', 'yeoman-generator'])
		this.spawnCommandSync('npx', ['eslint', '--init'])
	}
}
