
## <%= description %>

#### example
1. Change into the directory of your "scope" or  (for unscoped packages) where your global packages are.
1. Create a directory with name of your new generator.
Convention is lower case and dash-separated, and must start with "generator-", here we assume we want to generate "some-stuff":
```
mkdir generator-some-stuff
```
1. Change into this directory
```
cd generator-some-stuff
```
1. Create the scaffolding. You will be asked for some global settings, which will be saved in package.json:
```
npx -p <%= name %> -p yo yo @<%= scope %>/<%= generatorName %>
```
1. Test creation by execute prepared test:
```
npm run test
```

1. To adapt this generator in app/index.js, levearge yeoman's docs:
https://yeoman.io/authoring/running-context.html
