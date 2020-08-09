## <%= description %>

#### example
1. Change into you scope directory, where your packages (of corrsesponding scope) are
1. Create a directory with name of your package.
Convention is lower case and dash-separated, here we assume we want to generate "your-package-name":
```
mkdir your-package-name
```
1. Change into this directory
```
cd your-package-name
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
