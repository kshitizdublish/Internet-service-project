# ZiggoSelfcare
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.1.

#### IDE
Any Text Editor would work fine, like [Sublime](https://www.sublimetext.com/) or [Webstorm](https://www.jetbrains.com/webstorm/download/)
Suggested & i am using it [Visual Studio Code](https://code.visualstudio.com/)

#### Dependencies
1. [NodeJs](https://nodejs.org/en/)
2. [AngularJs](https://cli.angular.io/) And [Angular CLI](https://cli.angular.io/)

#### Getting Started
Copy this repo to your local repo by
1. > `git clone repo_path` 
2. > `cd ziggo-selfcare` 
3. > `npm install` 
4. > `ng serve` 
5. > goto browser and run `http://localhost:4200/`

### Target based upon Environments
```
ng serve // end points will target dev
ng serve --env=qa // end points will target qa
ng serve --env=prod // end points will target prod
```

#### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
1. > Custom port and IP
2. > `ng serve --host 10.18.41.61 --port 4300`

#### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

#### how to Create Component 
1. > Run `ng generate component example-comp` this will create new component at `src/app/example-comp`
2. > If required to create new component under `example-comp` than run command like this `ng generate component example-comp/sub-example-comp` 
3. > Or shortcuts like `ng g c example-comp` 

#### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Build with Environment
1. > `ng build` API calls will point to dev
2. > `ng build --env=qa` API calls will point to QA enviroment
3. > `ng build --env=prod` API calls will point to production
4. > `ng build --prod --env=prod` adding `--prod` to build command will minify all files 
5. > `ng build --prod --env=prod --aot=false`
6. > `ng build --prod --env=stage --aot=false`

#### Deployment
1. After doing build command
2. On Root Folder notice `dist` folder created
3. Copy the contents of `dist` folder and paste to the root folder server
4. NOTE:- In case of `deployment` has to be done at sub-folder. Like www.xyz.com/trucks/. Than Need to configure `base HREF` at index file.

#### How to configure `Environment path` and `Location`
1. Under `src/enviroments` folder 
2. environment files are there with environment type named, like `qa or prod`
3. default is enviroment, which is dev
4. All files contains same object with different value.
5. Here we should configure different enviroment paths.

#### Insert Base HREF path
1. ng build --base-href /myUrl/ 
2. ng build --bh /myUrl/ 
3. this will update on `index.html` for `base-href` 

#### Modules Update
Every time module is added or deleted must restart ng serve
#### Tech-Stack
* > Angularjs 4. [Docs](https://angular.io/docs)
* > Bootstrap 3.3.7. Bootstrap 3 help guide at [BS3](https://www.w3schools.com/bootstrap/default.asp)
* > Fontawesome 4.7. For using icons we have [Font Awesom](http://fontawesome.io/icons/)
Icons like, `user profile icon/loader/spinner etc`
How to use and sample can be seen [Here](http://fontawesome.io/examples/)
* > SASS/ CSS3. For css & stlye we are using `SASS`. Some basics of [SASS](http://sass-lang.com/guide)
While creating new component `ng generate component component-name`, default style type is `.css` but if required rename it to `.scss`. But mostly it will required.
While using SASS, need to use `./common/_variables.scss && ./common/common.scss`
These files will hold some common color codes and style guide.

#### Locale Language Help, how to use it.
* > locale can be located at root folder/src/locale/i18n/
* > As of now 2 languages are supported English(en) & Dutch(nl)

#### how to use in HTML template 
```
<button type="submit"> {{ 'Login.loginBtn' | translate }} </button>
```
#### How to use in type script
```
this.translate.get('Login.invalidEmail').subscribe((res: string) => { 
          this.loginErrorMsg = res; 
        });
```
#### How to change Language Event
```
// pass lang = en || nl
this._customEvents.langChangeEvt.emit({lang:'nl'});
```

#### Updating Angular CLI

First Global package:
```
npm uninstall -g @angular/cli
npm cache clean
# if npm version is > 5 then use `npm cache verify` to avoid errors (or to avoid using --force)
npm install -g @angular/cli@latest
```

Update Package Level CLI
```
npm uninstall --save-dev angular-cli
npm install --save-dev @angular/cli@latest
npm install
```

### Thumb rule
Before making push please run this command
```
ng lint --type-check
```

#### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).