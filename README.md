<!--
  This file was generated by emdaer

  Its template can be found at .emdaer/README.emdaer.md
-->

<!--
  emdaerHash:f48c824800e9ec59839c2c6b857d5e2a
-->

<p align="center"><img src="hero.svg" alt="emdaer"></p>

<h1 id="emdaer-travis-documented-with-emdaer-maintained-with-lerna">emdaer · <a href="https://travis-ci.org/emdaer/emdaer/"><img src="https://img.shields.io/travis/emdaer/emdaer.svg?style=flat-square" alt="Travis"></a> <a href="https://github.com/emdaer/emdaer"><img src="https://img.shields.io/badge/📓-documented%20with%20emdaer-F06632.svg?style=flat-square" alt="Documented with emdaer"></a> <a href="https://lernajs.io/"><img src="https://img.shields.io/badge/🐉-maintained%20with%20lerna-cc00ff.svg?style=flat-square" alt="Maintained with lerna"></a></h1>
<p>📓 emdaer is a tool for creating and maintaining better READMEs</p>
<!-- toc -->
<ul>
<li><a href="#what-is-emdaer">What is emdaer?</a></li>
<li><a href="#adding-emdaer-to-your-project">Adding emdaer to your project</a><ul>
<li><a href="#manual-usage">Manual Usage</a></li>
</ul>
</li>
<li><a href="#how-emdaer-works">How emdaer works</a><ul>
<li><a href="#plugins--transforms">Plugins &amp; Transforms</a></li>
<li><a href="#code-fences">Code Fences</a></li>
</ul>
</li>
<li><a href="#core-plugins">Core Plugins</a></li>
<li><a href="#core-transforms">Core Transforms</a></li>
<li><a href="#contributing">Contributing</a></li>
<li><a href="#this-readme">This README</a></li>
<li><a href="#license">License</a></li>
</ul>
<!-- tocstop -->
<h2 id="what-is-emdaer-">What is emdaer?</h2>
<p>emdaer lets you to use plugins and transforms within markdown files because READMEs (and other documentation) are crucial files that are often lackluster and/or incomplete and have a tendency to become stale</p>
<p>A couple use cases that illustrate the power of emdaer:</p>
<ul>
<li>🤝 <strong>Keep it in sync</strong> Create templates for use across all of your organizations projects to promote synchronicity and reduce doing the same work over and over</li>
<li>🗃 <strong>Keep it organized</strong> Keep your documentation DRY and organized by importing content from your codebase, splitting large documents into chunks, and formatting it with <a href="https://github.com/prettier/prettier">Prettier</a>.</li>
<li>🍋 <strong>Keep it fresh</strong> Ensure your documents stay up to date by pulling in new data from various sources with every build</li>
</ul>
<h2 id="adding-emdaer-to-your-project">Adding emdaer to your project</h2>
<p>We recommend using emdaer with <a href="https://github.com/okonet/lint-staged">lint-staged</a> and <a href="https://github.com/typicode/husky">husky</a>.</p>
<p>Install dependencies:</p>

```sh
npm install --save-dev @emdaer/cli @emdaer/plugin-value-from-package lint-staged husky
```
<p>or with <a href="https://yarnpkg.com/">yarn</a>:</p>

```sh
yarn add @emdaer/cli @emdaer/plugin-value-from-package lint-staged husky -D
```
<p>Follow the <a href="https://github.com/okonet/lint-staged#installation-and-setup">lint-staged setup instructions</a>.</p>

```diff
{
  "scripts": {
+   "emdaer": "emdaer && git add *.md",
+   "precommit": "lint-staged"
  }
}
```
<p>In your lint-staged config file add an entry for emdaer:</p>

```diff
module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'git add'],
+ '*.emdaer.md': ['emdaer --yes', 'git add *.md'],
};
```
<p>NOTE: In the case of a <code>precommit</code> hook (or CI/other automation), we don’t want to be prompted about anything. The <code>--yes</code> flag will automatically answer “yes” to any prompts. For example, it will make emdaer write your READMEs without prompting about overwritting direct changes to a destination README file.</p>
<p>Add a <code>.emdaer/README.emdaer.md</code> file:</p>
<!-- prettier-ignore-start -->

```md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->
```
<!-- prettier-ignore-end -->
<p>And give it a whirl:</p>

```sh
npm run emdaer
```
<p>When you commit your changes, lint-staged will run emdaer on any <code>*.emdaer.md</code> files you may have changed.</p>
<h3 id="manual-usage">Manual Usage</h3>
<p>emdaer can be run manually against files by providing space separated file paths:</p>

```sh
npm run emdaer -- .emdaer/README.emdaer.md .emdaer/CONTRIBUTING.emdaer.md
```
<p>If emdaer is not provided a path, the default glob <code>.emdaer/**/*.emdaer.md</code> is searched:</p>

```sh
npm run emdaer
```
<p><em>NOTE:</em> By default, emdaer checks for existing changes to your READMEs before writing. If it detects changes, it will provide a prompt asking if you would like to overwrite the README with the newly generated content. If you accidentally edited the README directly, you will want to answer <code>n</code> to the prompt, move any changes to the respective <code>.emdaer/*.emdaer.md</code> file, and rerun emdaer. If you would like to discard those changes, answer <code>Y</code> to the prompt or use the <code>--yes</code> flag to skip the prompt all together. In both cases, emdaer will overwrite the README with the newly generated content.</p>
<h2 id="how-emdaer-works">How emdaer works</h2>
<p>emdaer processes template files and writes the resulting files to your project.</p>
<p>We match <code>.emdaer/(**/*).emdaer(.md)</code> and use the captured part of each matched file to determine the path for the output.</p>
<details>
  <summary>💡 Hint</summary>
  <p>In the case that you have an emdaer file in a nested directory inside the <code>.emdaer</code> directory, emdaer will output the respective README in that directory in your code base. For example, <code>.emdaer/src/components/README.emdaer.md</code> will output the generated README at <code>src/components/README.emdaer.md</code>.</p>
</details>

<h3 id="plugins-transforms">Plugins &amp; Transforms</h3>
<!-- prettier-ignore-start -->

```md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->

Hello, World!

<!--emdaer-p
  - '@emdaer/plugin-import'
  - path: './.emdaer/printThrice.js'
    args:
      - 'Hey'
-->

<!--emdaer-t
  - '@emdaer/transform-prettier'
  - options:
      proseWrap: preserve
      singleQuote: true
      trailingComma: es5
-->
```
<!-- prettier-ignore-end -->
<p>This example, once processed, will look something like this:</p>

```md
<h1>mypackage-name</h1>

<p>Hello, World!</p>

<p>Hey<br>Hey<br>Hey</p>
```
<p>This example includes two plugin calls (<code>emdaer-p</code>) and one transform call (<code>emdaer-t</code>).</p>
<details>
  <summary>❓ Help</summary>
  <blockquote>
    The first plugin call is to <a href="/emdaer/emdaer/blob/master/packages/plugin-value-from-package">@emdaer/plugin-value-from-package</a>. It is used to get the value of <code>name</code> from <code>package.json</code>. That way if your project name change, so does your README.
  </blockquote>
  <blockquote>
    The second plugin call is to <a href="/emdaer/emdaer/blob/master/packages/plugin-import">@emdaer/plugin-import</a>. It is used to import a function called <code>printThrice</code> and executing it with the argument <code>Hey</code>, printing it three times. The <code>path</code> parameter can be any node modules that exports a string, exports a function that returns a string, or exports a funciton that returns a promise that resolves to a string.
  </blockquote>
  <blockquote>
    The third emdaer call is to <a href="/emdaer/emdaer/blob/master/packages/transform-prettier">@emdaer/transform-prettier</a>. It will format your README with the given options so you don’t have to.
  </blockquote>
</details>

<p>Emdaer plugin/transform calls are just html comments.
These calls take the form of yaml tuples where the first item is the name of the function to call and the second item is an options object that is passed to that function.</p>
<p>For plugins, the result of the call replaces the corresponding comment block.</p>
<p>For transforms, the function acts on the entire document and rewrites the entire file. In some cases, like <a href="/emdaer/emdaer/blob/master/packages/transform-table-of-contents">@emdaer/transform-table-of-contents</a>, transforms can inline their content, replacing the corresponding comment block.</p>
<h3 id="code-fences">Code Fences</h3>
<p>Platforms vary in how they provide syntax highlighted code to users READMEs, rendering code fences with language specificers as HTML/CSS, each in their own way. Emdaer also transforms your README in HTML via <a href="https://github.com/markedjs/marked">marked</a> to make it more portable.</p>
<p>Instead of trying to guess how platforms expect the HTML/CSS of a code fence to be output, when emdaer encounters a code fence with a language specified, it will ignore it. This means that while the rest of your README will be transformed to HTML, code fences will remain in Markdown. This sacrifices a bit of portability for the sake of readability and UX.</p>
<p><em>NOTE:</em> If it’s important that your README be pure HTML, do not use language specifiers in your code fences.</p>
<h2 id="core-plugins">Core Plugins</h2>
<ul>
<li><strong><a href="packages/plugin-contributors-details-github">@emdaer/plugin-contributors-details-github</a></strong> An emdaer plugin that gathers and renders contributor details from GitHub</li>
<li><strong><a href="packages/plugin-details">@emdaer/plugin-details</a></strong> An emdaer plugin that renders HTML5 details elements from which users can retrieve additional information</li>
<li><strong><a href="packages/plugin-documentation">@emdaer/plugin-documentation</a></strong> An emdaer plugin to generate documentation from your code comments using documentationjs</li>
<li><strong><a href="packages/plugin-image">@emdaer/plugin-image</a></strong> An emdaer plugin that renders HTML img elements</li>
<li><strong><a href="packages/plugin-import">@emdaer/plugin-import</a></strong> An emdaer plugin that imports content from another file</li>
<li><strong><a href="packages/plugin-jsdoc-tag-value">@emdaer/plugin-jsdoc-tag-value</a></strong> An emdaer plugin that pulls values from a given function’s jsdoc comment</li>
<li><strong><a href="packages/plugin-license-reference">@emdaer/plugin-license-reference</a></strong> An emdaer plugin that renders license information from the package</li>
<li><strong><a href="packages/plugin-link">@emdaer/plugin-link</a></strong> An emdaer plugin that renders anchor elements</li>
<li><strong><a href="packages/plugin-list">@emdaer/plugin-list</a></strong> An emdaer plugin that renders HTML list element.</li>
<li><strong><a href="packages/plugin-list-lerna-packages">@emdaer/plugin-list-lerna-packages</a></strong> An emdaer plugin that generate a list of lerna packages in a project.</li>
<li><strong><a href="packages/plugin-shields">@emdaer/plugin-shields</a></strong> An emdaer plugin that renders metadata badges for open source projects from shields.io</li>
<li><strong><a href="packages/plugin-table">@emdaer/plugin-table</a></strong> An emdaer plugin that renders HTML tables</li>
<li><strong><a href="packages/plugin-value-from-package">@emdaer/plugin-value-from-package</a></strong> An emdaer plugin that retrieves and renders values from package.json</li>
</ul>
<h2 id="core-transforms">Core Transforms</h2>
<ul>
<li><strong><a href="packages/transform-github-emoji">@emdaer/transform-github-emoji</a></strong> An emdaer transformation that renders GitHub-flavored emoji codes</li>
<li><strong><a href="packages/transform-prettier">@emdaer/transform-prettier</a></strong> An emdaer transformation that formats markdown, including code blocks, using prettier</li>
<li><strong><a href="packages/transform-table-of-contents">@emdaer/transform-table-of-contents</a></strong> An emdaer transformation that generates a table of contents</li>
</ul>
<h2 id="contributing">Contributing</h2>
<p>If you’d like to make emdaer better, please read our <a href="./CONTRIBUTING.md">guide to contributing</a>.</p>
<details>
<summary><strong>Contributors</strong></summary><br>
<a title="Can you jam with the console cowboys in cyberspace?" href="https://github.com/flipactual">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1306968?s=24">
</a>
<strong>Flip</strong>
<br><br>
<a title="I build multi-channel publishing systems and web applications at @fourkitchens." href="https://github.com/infiniteluke">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1127238?s=24">
</a>
<strong>Luke Herrington</strong>
<br><br>
<a title="Software architect with an interest in distributed systems and elegant solutions." href="https://github.com/elliotttf">
  <img align="left" src="https://avatars0.githubusercontent.com/u/447151?s=24">
</a>
<strong>Elliott Foster</strong>
<br><br>
<a href="https://github.com/thebruce">
  <img align="left" src="https://avatars0.githubusercontent.com/u/590058?s=24">
</a>
<strong>David Diers</strong>
<br><br>
<a href="https://github.com/fluxsauce">
  <img align="left" src="https://avatars0.githubusercontent.com/u/976391?s=24">
</a>
<strong>Jon Peck</strong>
<br><br>
</details>

<h2 id="this-readme">This README</h2>
<p>This README was generated with emdaer. However, it is special in that it shares its content with the <a href="emdaer.netlify.com">emdaer website</a> via the <a href="https://www.npmjs.com/package/@emdaer/meta">@emdaer/meta</a> and <a href="https://www.npmjs.com/package/@emdaer/plugin-import">@emdaer/plugin-import</a> packages. <a href="https://www.npmjs.com/package/@emdaer/meta">@emdaer/meta</a> exports each section of this README as a node module which <a href="https://www.npmjs.com/package/@emdaer/plugin-import">@emdaer/plugin-import</a> imports like so:</p>
<!-- prettier-ignore-start -->

```md
<!--emdaer-p
  - '@emdaer/plugin-import'
  - path: '@emdaer/meta/lib/README/this-readme.md'
-->
```
<!-- prettier-ignore-end -->
<h2 id="license">License</h2>
<p>emdaer is <a href="./LICENSE">MIT licensed</a>.</p>
