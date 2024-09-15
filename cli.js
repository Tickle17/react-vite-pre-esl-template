#!/usr/bin/env node
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

// Название проекта и путь
const projectName = process.argv[2] || "my-new-project";
const projectPath = path.join(process.cwd(), projectName);

// Шаг 1: Клонируем шаблон в новую директорию
execSync(`npx degit Tickle17/react-vite-pre-esl-template ${projectPath}`, {
    stdio: "inherit",
});

// Переходим в директорию проекта
process.chdir(projectPath);

// Шаг 2: Устанавливаем зависимости
console.log(`Installing dependencies in ${projectPath}...`);
execSync("npm install", { stdio: "inherit" });

// Шаг 3: Удаление файла cli.js
console.log("Removing cli.js...");
fs.unlinkSync(path.join(projectPath, "cli.js"));

// Шаг 4: Очищаем Git (удаление .git директории)
console.log("Cleaning .git directory...");
execSync("rm -rf .git", { stdio: "inherit" });

// Шаг 5: Удаление секции bin из package.json
console.log("Removing 'bin' section from package.json...");
const packageJsonPath = path.join(projectPath, "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Удаляем секцию bin
delete packageJson.bin;

// Перезаписываем package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log("Project setup complete and cleaned up!");
