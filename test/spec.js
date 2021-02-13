const helpers = require('yeoman-test'),
	{ basename, join, dirname } = require('path'),
	{ file, fileContent } = require('yeoman-assert')

before(() => helpers.setUpTestDirectory(join(__dirname, 'generator-test')))

describe('ui generator', () => {
	it('creates some core files, each generator should have', () =>
		helpers
			.run(join(__dirname, '../app'))
			.withPrompts({
				description: 'a test project',
			})
			.then((dir) => {
				//by convention, default packagename is based on directory names
				var testPackageName = basename(dirname(dir)) + '/' + basename(dir)
				file(['package.json', 'test/spec.js', 'app/index.js'])
				fileContent('package.json', RegExp(testPackageName, 'g'))
			})).timeout(60000)
})
