(window.webpackJsonp=window.webpackJsonp||[]).push([[269],{325:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return l})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return u}));var a=t(2),o=t(6),r=(t(0),t(516)),i={title:"What Is Augur",description:"An introduction to Augur's code structure, the monorepo, and the tools necessary to develop within it."},l={unversionedId:"SUMMARY",id:"SUMMARY",isDocsHomePage:!1,title:"What Is Augur",description:"An introduction to Augur's code structure, the monorepo, and the tools necessary to develop within it.",source:"@site/../docs/SUMMARY.md",permalink:"/docs/SUMMARY",editUrl:"https://github.com/AugurProject/augur/edit/documentation/augur.sh/../docs/SUMMARY.md",sidebar:"docs",next:{title:"overview",permalink:"/docs/contracts/overview"}},c=[{value:"Prerequisites",id:"prerequisites",children:[{value:"Basics",id:"basics",children:[]},{value:"Additional for full local development",id:"additional-for-full-local-development",children:[]}]},{value:"Cloning the Repository",id:"cloning-the-repository",children:[]},{value:"Installing Dependencies &amp; Building",id:"installing-dependencies--building",children:[]},{value:"Tools and Helpers",id:"tools-and-helpers",children:[{value:"<code>yarn build</code>",id:"yarn-build",children:[]},{value:"<code>yarn clean</code>",id:"yarn-clean",children:[]},{value:"<code>yarn flash</code>",id:"yarn-flash",children:[]},{value:"<code>yarn docker:all</code>",id:"yarn-dockerall",children:[]},{value:"<code>yarn workspace &lt;package-name&gt; &lt;command&gt;</code>",id:"yarn-workspace-package-name-command",children:[]},{value:"Resources",id:"resources",children:[]}]}],s={rightToc:c};function u(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"introduction"},"Introduction"),Object(r.b)("p",null,"Augur has ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/AugurProject/augur"}),"moved all development")," into the monorepo structure popularized by huge javascript projects like React and Webpack. In a monorepo, all project packages, plugins, and components are bundled together into one physical git repository. This greatly simplifies dependency management, making cross-module changes in atomic commits, simplifies cross-module testing, and means developers to access all parts of the code without changing configurations."),Object(r.b)("p",null,"The Augur Monorepo uses a feature built into the ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://yarnpkg.com"}),"Yarn Package Manager")," called ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.notion.so/Augur-Monorepo-39c77aaf99c84f31b54c2124653421f1"}),"Workspaces"),". Yarn Workspaces manage the complexity of linking together the various packages, and give a nice CLI interface for working with sub-packages and sub-package NPM commands. For this reason, Augur requires the use of ",Object(r.b)("inlineCode",{parentName:"p"},"yarn")," for installing and managing dependencies."),Object(r.b)("p",null,"The monorepo acts like most other projects in the javascript ecosystem. Starting with a clone of the git repo, you must first install dependencies, build any dependencies that need it, and then you're ready to start developing. In the case of Augur there are also a variety of other tools actually needed to develop in an end-to-end manner \u2014 but for the scope of this document we'll just be discussing how to interact with the monorepo itself."),Object(r.b)("h2",{id:"prerequisites"},"Prerequisites"),Object(r.b)("h3",{id:"basics"},"Basics"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"Git - Any recent version"),Object(r.b)("li",{parentName:"ul"},"Node.js - version 10+ ","(",Object(r.b)("em",{parentName:"li"},"Optional: It is often convenient to use")," ",Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/nvm-sh/nvm"}),Object(r.b)("em",{parentName:"a"},"Node Version Manager ","(","nvm",")"))," ",Object(r.b)("em",{parentName:"li"},"to manage multiple NodeJS versions.",")")),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://classic.yarnpkg.com/en/docs/install"}),"Yarn")," - version 1.22+")),Object(r.b)("h3",{id:"additional-for-full-local-development"},"Additional for full local development"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://docs.docker.com/install/"}),"Docker CE")," ","(","a recent built, currently 18.06+",")"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://docs.docker.com/compose/install/"}),"docker-compose")," ","(","supporting file version 3.7+",")")),Object(r.b)("p",null,Object(r.b)("strong",{parentName:"p"},"Note on developing on Windows")),Object(r.b)("p",null,"While windows has come a long way over the last few years, developing for Augur completely within the Windows ecosystem is quite painful. The recommendation is that if you're going to be doing any development on Augur itself, use ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://docs.microsoft.com/en-us/windows/wsl/wsl2-index"}),"Windows Subsystem for Linux ","(","WSL",")")," and do development in a virtualized Linux environment. You will be able to run your normal windows web browser in order to interact with the UI, as well as use windows-based IDEs such as Visual Studio Code or IntelliJ Webstorm with WSL system."),Object(r.b)("h2",{id:"cloning-the-repository"},"Cloning the Repository"),Object(r.b)("p",null,"Augur's Github repository is accessible publicly and we accept pull requests directly to the main repository. The clone the repository locally the following in your terminal in the directory you want to begin developing augur."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"> git clone https://augurproject.com/AugurProject/augur.git\n")),Object(r.b)("p",null,"This will create the output folder ",Object(r.b)("inlineCode",{parentName:"p"},"augur")," which will contain the entire augur source tree. For example"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"> ls ./augur\n./             support/            azure-pipelines.yml  setup_tmux.sh*\n../            .dockerignore       debugging.md         tsconfig-base.json\n.git/          .editorconfig       issues-workflow.md   tsconfig.json\n.github/       .gitignore          jest.config.js       tsconfig.release.json\ndocs/          .mergify.yml        lerna.json           tslint.json\ninfra/         .nvmrc              package.json         yarn.lock\nnode_modules/  CODE_OF_CONDUCT.md  peek.yaml\npackages/      LICENSE             prettier.config.js\nscripts/       README.md           renovate.json\n")),Object(r.b)("h2",{id:"installing-dependencies--building"},"Installing Dependencies & Building"),Object(r.b)("p",null,"Once you've cloned the repository, the next step will be to install the dependencies. The first step to this will be to make sure you have the ",Object(r.b)("inlineCode",{parentName:"p"},"yarn")," package manager installed. If attempting to run yarn gives ",Object(r.b)("inlineCode",{parentName:"p"},"Command not found")," make sure you check out the install page of the Yarn Package Manager website. After yarn is installed:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"> yarn\nyarn install v1.22.0\n[1/5] Validating package.json...\n[2/5] Resolving packages...\n... ( this will take a long time) ...\n")),Object(r.b)("p",null,"After all dependencies have been installed correctly, you can manually build all of the Augur source code, giving you the ability to run tools, a standalone SDK server, and tests."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"> yarn build\n... (this will take a long time) ...\n")),Object(r.b)("p",null,"If yarn build fails, and the error is coming from something referencing ",Object(r.b)("inlineCode",{parentName:"p"},"node_gyp"),", attempt to install without running install scripts, using ",Object(r.b)("inlineCode",{parentName:"p"},"yarn --ignore-scripts")),Object(r.b)("h2",{id:"tools-and-helpers"},"Tools and Helpers"),Object(r.b)("p",null,"There are various tools exposed via the npm scripts in the top-level ",Object(r.b)("inlineCode",{parentName:"p"},"package.json")," inside the Augur Monorepo. One of these was used above to build all of the augur source code. You can see the whole list by running ",Object(r.b)("inlineCode",{parentName:"p"},"yarn run"),". Many of these scripts are various helpers needed for specific circumstances but a few of them are general use. Also, there are standard ",Object(r.b)("inlineCode",{parentName:"p"},"yarn")," commands which are useful while using Augur."),Object(r.b)("h3",{id:"yarn-build"},Object(r.b)("inlineCode",{parentName:"h3"},"yarn build")),Object(r.b)("p",null,"Recursively build all packages in the ",Object(r.b)("inlineCode",{parentName:"p"},"packages/")," directory. Augur's source code is written in typescript and must be compiled into Javascript to be executed. This will intelligently build changed files based upon the rules specified in ",Object(r.b)("inlineCode",{parentName:"p"},"tsconfig.json"),"."),Object(r.b)("p",null,"Add",Object(r.b)("inlineCode",{parentName:"p"},"-w")," to this command to watch the file system for changes and automatically build changed files."),Object(r.b)("h3",{id:"yarn-clean"},Object(r.b)("inlineCode",{parentName:"h3"},"yarn clean")),Object(r.b)("p",null,"Completely cleans the source tree, deleting installed dependencies and built code."),Object(r.b)("h3",{id:"yarn-flash"},Object(r.b)("inlineCode",{parentName:"h3"},"yarn flash")),Object(r.b)("p",null,"Flash is the name of the general CLI for augur. This includes a huge amount of tools and options, run ",Object(r.b)("inlineCode",{parentName:"p"},"yarn flash --help")," to get a full break down. Examples of things you can do with flash are: Run a full local development environment, deploy the Augur contracts to an Ethereum-compatible blockchain, create markets, create orders, make trades, and more."),Object(r.b)("h3",{id:"yarn-dockerall"},Object(r.b)("inlineCode",{parentName:"h3"},"yarn docker:all")),Object(r.b)("p",null,"This is a shortcut for ",Object(r.b)("inlineCode",{parentName:"p"},"yarn flash docker-all")," and is used to spin up a local development environment which will allow a the UI to run, make trades, etc. In order to run this command, you must have the Docker & Docker Compose pre-requisites installed."),Object(r.b)("h3",{id:"yarn-workspace-package-name-command"},Object(r.b)("inlineCode",{parentName:"h3"},"yarn workspace <package-name> <command>")),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"yarn workspace")," command is a shortcut allowing you to easily run NPM scripts defined in one of the augur sub-packages. For example, you can add a module to a sub-package as follows:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"> yarn workspace @augurproject/sdk add --exact MyDependency\n")),Object(r.b)("p",null,"For the most commonly used packages within augur have a helper to shorten this syntax. E.g:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),">An  yarn ui <command> # Shortcut for yarn workspace @augurproject/ui <command>\n> yarn tools <command>\n> yarn sdk <command>\n")),Object(r.b)("h3",{id:"resources"},"Resources"),Object(r.b)("p",null,Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.notion.so/Monorepo-Packages-List-970db04e410e49a590f9f1691a29a001"}),"Monorepo Packages List")))}u.isMDXComponent=!0},516:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return m}));var a=t(0),o=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=o.a.createContext({}),u=function(e){var n=o.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=u(e.components);return o.a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},b=o.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=u(t),b=a,m=d["".concat(i,".").concat(b)]||d[b]||p[b]||r;return t?o.a.createElement(m,l(l({ref:n},s),{},{components:t})):o.a.createElement(m,l({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,i=new Array(r);i[0]=b;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<r;s++)i[s]=t[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);