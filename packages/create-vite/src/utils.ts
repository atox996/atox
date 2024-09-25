import fs from "node:fs";
import path from "node:path";
import { exec } from "child_process";
export function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

export const getProjectName = (targetDir: string) =>
  targetDir === "." ? path.basename(path.resolve()) : targetDir;

export function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  );
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

export function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

// 检查命令是否可用的辅助函数
export function checkCommand(command: string) {
  return new Promise<string | null>((resolve) => {
    exec(`${command} --version`, (error) => {
      if (error) {
        resolve(null); // 不可用时返回 null
      } else {
        resolve(command); // 可用时返回命令名
      }
    });
  });
}

// 检查包管理器
export async function findAvailablePackageManager() {
  const commands = ["pnpm", "yarn", "npm"];

  for (const command of commands) {
    const availableCommand = await checkCommand(command);
    if (availableCommand) {
      return availableCommand; // 找到可用的命令后立即返回
    }
  }

  console.log("No package manager is available.");
  return null; // 如果没有包管理器可用
}

export function copy(
  src: string,
  dest: string,
  ignoreValidator?: (src: string) => boolean,
) {
  if (ignoreValidator?.(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest, ignoreValidator);
  } else {
    fs.copyFileSync(src, dest);
  }
}

export function copyDir(
  srcDir: string,
  destDir: string,
  ignoreValidator?: (src: string) => boolean,
) {
  if (ignoreValidator?.(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile, ignoreValidator);
  }
}
