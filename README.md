<!--
  This file was generated by emdaer

  Its template can be found at .emdaer/README.emdaer.md
-->

<img src="hero.png" alt="emdaer" align="center" />
# emdaer · [![Travis](https://img.shields.io/travis/emdaer/emdaer.svg?style=flat-square)](https://travis-ci.org/emdaer/emdaer/) [![Documented with emdaer](https://img.shields.io/badge/📓-documented%20with%20emdaer-F06632.svg?style=flat-square)](https://github.com/emdaer/emdaer) [![Maintained with lerna](https://img.shields.io/badge/🐉-maintained%20with%20lerna-cc00ff.svg?style=flat-square)](https://lernajs.io/)
📓 emdaer is a tool for creating and maintaining better READMEs

<!-- toc -->

- [What is emdaer?](#what-is-emdaer)
- [How emdaer works](#how-emdaer-works)
  * [Plugins & Transforms](#plugins--transforms)
- [Adding emdaer to your project](#adding-emdaer-to-your-project)
- [Core Plugins](#core-plugins)
- [Core Transforms](#core-transforms)
- [Contributing](#contributing)
- [This README](#this-readme)
- [License](#license)

<!-- tocstop -->

## What is emdaer?

emdaer lets you to use plugins and transforms within markdown files because READMEs (and other documentation) are crucial files that are often lackluster and/or incomplete and have a tendency to become stale

A couple use cases that illustrate the power of emdaer:

* 🤝 **Keep it in sync** Create templates for use across all of your organizations projects to promote synchronicity and reduce doing the same work over and over
* 🗃 **Keep it organized** Keep your documentation DRY and organized by importing content from your codebase, splitting large documents into chunks, and formatting it with [Prettier](https://github.com/prettier/prettier).
* 🍋 **Keep it fresh** Ensure your documents stay up to date by pulling in new data from various sources with every build
  ## How emdaer works

emdaer processes template files and writes the resulting files to your project.

We match `.emdaer/(**/*).emdaer(.md)` and use the captured part of each matched file to determine the path for the output.

### Plugins & Transforms

<!-- prettier-ignore -->
```md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->

Hello, World!

<!--emdaer-t
  - '@emdaer/transform-smartypants'
  - options: qe
-->
```

This example includes one plugin call (`emdaer-p`) and one transform call (`emdaer-t`).

Both of these calls take the form of yaml tuples where the first item is the name of the function to call and the second item is an options object that is passed to that function.

For plugins, the result of the call replaces the corresponding comment block.

For transforms, the function acts on the entire document and rewrites the entire file.

## Adding emdaer to your project

We recommend using emdaer with [husky](https://github.com/typicode/husky).

Install dependencies:

```sh
npm install --save-dev @emdaer/cli @emdaer/plugin-value-from-package husky
```

Add a `precommit` script:

```json
  "scripts": {
    "emdaer": "emdaer && git add *.md",
    "precommit": "npm run emdaer"
  }
```

Add a `.emdaer/README.emdaer.md` file:

```md
# <!--emdaer-p

* '@emdaer/plugin-value-from-package'
* value: name -->
```

And give it a whirl:

```sh
npm run emdaer
```

## Core Plugins

* **[@emdaer/plugin-contributors-details-github](packages/plugin-contributors-details-github)** An emdaer plugin that gathers and renders contributor details from GitHub
* **[@emdaer/plugin-details](packages/plugin-details)** An emdaer plugin that renders HTML5 details elements from which users can retrieve additional information
* **[@emdaer/plugin-documentation](packages/plugin-documentation)** An emdaer plugin to generate documentation from your code comments using documentationjs
* **[@emdaer/plugin-image](packages/plugin-image)** An emdaer plugin that renders HTML img elements
* **[@emdaer/plugin-import](packages/plugin-import)** An emdaer plugin that imports content from another file
* **[@emdaer/plugin-license-reference](packages/plugin-license-reference)** An emdaer plugin that renders license information from the package
* **[@emdaer/plugin-link](packages/plugin-link)** An emdaer plugin that renders anchor elements
* **[@emdaer/plugin-list](packages/plugin-list)** An emdaer plugin that renders HTML list element.
* **[@emdaer/plugin-list-lerna-packages](packages/plugin-list-lerna-packages)** An emdaer plugin that generate a list of lerna packages in a project.
* **[@emdaer/plugin-node-package](packages/plugin-node-package)** An emdaer plugin that requires a file and optionally executes it with provided arguments.
* **[@emdaer/plugin-shields](packages/plugin-shields)** An emdaer plugin that renders metadata badges for open source projects from shields.io
* **[@emdaer/plugin-table](packages/plugin-table)** An emdaer plugin that renders HTML tables
* **[@emdaer/plugin-value-from-package](packages/plugin-value-from-package)** An emdaer plugin that retrieves and renders values from package.json

  ## Core Transforms

* **[@emdaer/transform-github-emoji](packages/transform-github-emoji)** An emdaer transformation that renders GitHub-flavored emoji codes
* **[@emdaer/transform-prettier](packages/transform-prettier)** An emdaer transformation that formats markdown, including code blocks, using prettier
* **[@emdaer/transform-smartypants](packages/transform-smartypants)** An emdaer transformation that translates ASCII punctuation characters into typographic punctuation HTML entities
* **[@emdaer/transform-table-of-contents](packages/transform-table-of-contents)** An emdaer transformation that generates a table of contents
  ## Contributing

If you&#8217;d like to make emdaer better, please read our [guide to contributing](./CONTRIBUTING.md).

<details>
<summary><strong>Contributors</strong></summary><br />
<a href="https://github.com/flipactual">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1306968?s=24" />
</a>
<strong>Flip</strong>
<br /><br />
<a title="I build multi-channel publishing systems and web applications at @fourkitchens." href="https://github.com/infiniteluke">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1127238?s=24" />
</a>
<strong>Luke Herrington</strong>
<br /><br />
<a title="Software architect with an interest in distributed systems and elegant solutions." href="https://github.com/elliotttf">
  <img align="left" src="https://avatars0.githubusercontent.com/u/447151?s=24" />
</a>
<strong>Elliott Foster</strong>
<br /><br />
<a href="https://github.com/thebruce">
  <img align="left" src="https://avatars0.githubusercontent.com/u/590058?s=24" />
</a>
<strong>David Diers</strong>
<br /><br />
<a href="https://github.com/fluxsauce">
  <img align="left" src="https://avatars0.githubusercontent.com/u/976391?s=24" />
</a>
<strong>Jon Peck</strong>
<br /><br />
</details>

## This README

This README was generated with emdaer. However, it is special in that it shares its content with the [emdaer website](emdaer.me) via the [@emdaer/meta](https://www.npmjs.com/package/@emdaer/meta) and [@emdaer/plugin-node-package](https://www.npmjs.com/package/@emdaer/plugin-node-package) packages. [@emdaer/meta](https://www.npmjs.com/package/@emdaer/meta) exports each section of this README as a node module which
[@emdaer/plugin-node-package](https://www.npmjs.com/package/@emdaer/plugin-node-package) imports like so:

<!-- prettier-ignore -->
```md
<!--emdaer-p
  - '@emdaer/plugin-node-package'
  - path: '@emdaer/meta/lib/README/this-readme.js'
-->
```

## License

emdaer is [MIT licensed](./LICENSE).




