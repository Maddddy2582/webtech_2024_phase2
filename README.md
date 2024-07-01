#
# WebTips Starter Repo 🌐💻
This will act as a starter repository for **WebTips** projects

#
# 🔗 Quicklinks
🔹[How to use this template repository?](#how-to-use-this-template-repository-🏁) \
🔹[How to create a starter repo?](./docs/documentation.md#how-to-create-a-starter-repo-🏁) \
🔹[How to create a worflow that runs unit tests for your repo?](./docs/documentation.md#how-to-create-a-worflow-that-runs-unit-tests-for-your-repo-🏁) 

### How to use this template repository? 🏁

👉 Step 1: Create a new repository and choose the webtips_starter_repo as the template repository. \
👉 Step 2: Clone the created repository.\
👉 Step 3: Run the command ```npm install``` in terminal\
👉 Step 4: To check lint, use the following commands:
```
npm run lintHTML
npm run lintCSS
npm run lintJS
```
👉 Step 5: To fix linting Errors, use the following commands:
```
npm run lintHTML -- --fix
npm run lintCSS -- --fix
npm run lintJS -- --fix
```

#### Note: The fix command will only limited errors
 

## 📎 GitHooks:
Follow the steps in this file to set up githooks in your local repository: [GitHooks](./docs/gitHooks.md#git-hooks) \
Ensure that your branch names and commit messages follow this syntax: [GuideLines](./docs/guidelines%20for%20git.md)

### 🔻 NOTE:
📌 For each assignment, create a new branch from the develop branch. \
📌 After you are done working on an assigment, merge to the develop branch. \
📌 When merging to the develop branch, the code's unit tests and playwright tests will be run, the code will be analyzed for syntax errors and spacing using Prettier, ESLint, html-eslint plugin and stylelint. So, ensure that your code follows these standards for the workflows to pass. \
📌 If any of the tests fail or there is any error in the code, the branch will not merge with the develop branch and the workflow will fail. \
📌 Once you are done working on the project, merge with the main branch. 

### 🔻 CODE ANALYZER NOTES:
✔️ The HTML Linter used in the code analyzer pipeline here is the html-eslint plugin. There are other options that can be used such as htmlHint. \
✔️ The coding standard specified in the pipeline for Es Linting is "Standard". There are other options such as Google and AirBnb. \
✔️ The JS files variable and function names should follow Camel Casing for the pipeline to pass. The js files should also be properly documented through jsdocs comments.

### 🔌 RECOMMENDED VS CODE PLUGINS:
✨ Prettier (To format your code)\
🅰️ CSS Alphabetize (To arrange properties in alphabetical order in CSS files)\
📖 Document This (To generate documentation for JavaScript files)





