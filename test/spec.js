const helpers = require('yeoman-test'),
	{join, basename, dirname} = require('path'),
	{ok} = require('assert').strict,
	{readFileSync, existsSync} = require('fs')

before(() => helpers.setUpTestDirectory(join(__dirname, 'generator-test')))

describe('ui generator', () => {
	it('creates some core files, each generator should have', () =>
		helpers.run(join(__dirname, '../app'))
			.withPrompts({
				description:'a test project'
			}).then(dir => {
				//by convention, default packagename is based on directory names
				var testPackageName = basename(dirname(dir)) + '/' + basename(dir)
				ok(existsSync(`${dir}/package.json`))
				ok(existsSync(`${dir}/test/spec.js`))
				ok(existsSync(`${dir}/app/index.js`))
				ok(readFileSync(`${dir}/package.json`, 'utf-8').match(RegExp(testPackageName, 'g')))
			})
	).timeout(60000)
})