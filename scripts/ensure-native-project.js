const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');
const nativeProjectsExist =
  fs.existsSync(path.join(projectRoot, 'android')) &&
  fs.existsSync(path.join(projectRoot, 'ios'));

if (!nativeProjectsExist) {
  const result = spawnSync('npx', ['expo', 'prebuild'], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}
