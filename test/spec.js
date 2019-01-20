const helpers = require('yeoman-test'),
	path = require('path'),
	fs = require('fs'),
	{ok} = require('assert').strict

describe('ui generator', () => {
	it('creates some core files, each generator should have', () =>
		helpers.run(path.join(__dirname, '../app'))
			.withPrompts({
				name:'my-project',
				description:'a test project'
			}).then(dir => {
				ok(fs.existsSync(`${dir}/package.json`))
				ok(fs.existsSync(`${dir}/test/spec.js`))
				ok(fs.existsSync(`${dir}/app/index.js`))
			})
	)
})
