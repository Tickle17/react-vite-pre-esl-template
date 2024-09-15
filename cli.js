#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");

const projectName = process.argv[2] || "my-new-project";
const projectPath = path.join(process.cwd(), projectName);

// Копируем файлы из шаблона в новую директорию
execSync(`npx degit githubusername/repositoryname ${projectPath}`, {
    stdio: "inherit",
});

// Переходим в директорию проекта
process.chdir(projectPath);

// Устанавливаем зависимости
console.log(`Installing dependencies in ${projectPath}...`);
execSync("npm install", { stdio: "inherit" });

console.log("Project setup complete!");
