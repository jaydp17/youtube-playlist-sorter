//  Using: https://github.com/typicode/please-upgrade-node
const chalk = require('chalk')

module.exports = function (pkg) {
  var requiredVersion = pkg.engines.node.replace(">=", "");
  var currentVersion = process.version.replace("v", "");
  if (currentVersion < requiredVersion) {
    console.error(
     chalk.yellow("%s requires at least version %s of Node, Please Upgrade\n"),
      pkg.name,
      requiredVersion
    );
    // Commented it out so that it doesn't crash but just shows the above message.
    // process.exit(1); 
  }
};
