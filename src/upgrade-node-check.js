//  Using: https://github.com/typicode/please-upgrade-node
const chalk = require('chalk');

module.exports = function(pkg) {
  var requiredVersion = pkg.engines.node.replace('>=', '');
  var currentVersion = process.version.replace('v', '');
  if (currentVersion < requiredVersion) {
    console.error(chalk.yellow('%s requires at least version %s of Node, Please Upgrade\n'), pkg.name, requiredVersion);
    // Changed from process.exit(1);
    process.exit();
  }
};
