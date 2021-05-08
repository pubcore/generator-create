const helpers = require('yeoman-test'),
	{ basename, join, dirname } = require('path')

before(() => helpers.setUpTestDirectory(join(__dirname, 'generator-test')))

describe('ui generator', () => {
	it('creates some core files, each generator should have', () =>
		helpers
			.run(join(__dirname, '../app'))
			.withPrompts({
				description: 'a test project',
			})
			.then((runResult) => {
				//by convention, default packagename is based on directory names
				var testPackageName =
          basename(dirname(runResult.cwd)) + '/' + basename(runResult.cwd)
				runResult.assertFile(['package.json', 'test/spec.js', 'app/index.js'])
				runResult.assertFileContent(
					'package.json',
					RegExp(testPackageName, 'g')
				)
			})).timeout(60000)
})
