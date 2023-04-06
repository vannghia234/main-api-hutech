const { cli, sh } = require('tasksfile');
const fse = require('fs-extra');
const { execSync } = require('child_process');
const packageJson = require('./package.json');
require('dotenv').config();

function buildBin() {
  build();
  sh(
    `pkg dist/cli/cli.js --config package.json --output dist/bin/${packageJson.name}`,
  );
}

function build() {
  sh('yarn build');
}

function deploy(options, deployServer) {
  build();

  let deployPath = '';
  if (!deployServer || deployServer === '') {
    deployPath = process.env['DEPLOY_PATH'];
  } else {
    deployPath = process.env[`${deployServer.toUpperCase()}_DEPLOY_PATH`];
  }

  console.log('update svn');
  execSync('svn up', { cwd: deployPath });

  console.log('xoa dist');
  execSync('rm -rf dist', { cwd: deployPath });

  console.log('cp folder');
  fse.copySync('./dist', deployPath + '/dist');
  fse.copySync('./assets', deployPath + '/assets');
  fse.copySync('./package.json', deployPath + '/package.json');
  fse.copySync('./yarn.lock', deployPath + '/yarn.lock');
  fse.copySync('./.env.example', deployPath + '/.env.example');

  console.log('add new');
  execSync(
    `for i in  $(svn st | grep \? | awk '{print $2}'); do svn add $i; done`,
    { cwd: deployPath },
  );

  console.log('delete old');
  execSync(
    `for i in  $(svn st | grep \! | awk '{print $2}'); do svn rm $i; done`,
    { cwd: deployPath },
  );

  console.log('commit');
  execSync(`svn commit -m "${packageJson.name}: update"`, { cwd: deployPath });

  console.log('deploy success');
}

cli({ buildBin, build, deploy });
