// const shell = require("shelljs");
const fs = require("fs").promises;

/**
 *  Requires rs.config.js from newly cloned rocket-science application,
 *  then updates the server port value.
 * @param {string} federatedServerPort - The new server port to be used.
 * @returns {object} - Returns the new rs.config.js object.
 */
async function createNewConfigFile(federatedServerPort) {
  try {
    const configFile = require(`${process.cwd()}/rs.config.js`);
    configFile.federatedServerPort = federatedServerPort;
    return configFile;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Writes the new rs.config.js file to the newly cloned rocket-science
 * app.
 * @param {object} newConfigFile - A new rs.config.js object.
 */
async function writeNewConfigFile(newConfigFile) {
  const pathToConfigFile = `${process.cwd()}/rs.config.js`;
  let configFile = "";

  try {
    for (const [key, value] of Object.entries(newConfigFile)) {
      configFile = configFile.concat(`\t${key}: "${value}",\n`);
    }

    await fs.writeFile(
      pathToConfigFile,
      Buffer.from(`module.exports = { \n ${configFile}};`),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

/**
 * Reads package.json of cloned rocket-science application and creates a new package.json
 * file with the new server port for federated script.
 * @param {string} newServerPort - The new server port to be used.
 * @returns {object} - Returns the new package.json object.
 */
async function createNewPackageJson(federatedServerPort, storybookPort) {
  const portRegex = /\d+$/;
  const pathToPackageJson = `${process.cwd()}/package.json`;

  try {
    const oldPackage = await fs.readFile(pathToPackageJson).catch((err) => {
      throw err;
    });
    // Locates federate script in package.json and replaces with new port
    let packageJson = JSON.parse(oldPackage);
    let fedServerScript = packageJson.scripts.federate;
    let newServerScript = fedServerScript.replace(
      portRegex,
      federatedServerPort
    );
    packageJson.scripts.federate = newServerScript;
    // Locates storybook script in package.json and replaces with new port
    let storybookScript = packageJson.scripts.storybook;
    let newStorybookScript = storybookScript.replace(portRegex, storybookPort);
    packageJson.scripts.storybook = newStorybookScript;
    return packageJson;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Writes the new package.json file with the new server port for federated script.
 * @param {object} packageJson - The new package.json object.
 */
async function writeNewPackageJson(newPackage) {
  const pathToPackageJson = `${process.cwd()}/package.json`;

  try {
    await fs.writeFile(
      pathToPackageJson,
      Buffer.from(JSON.stringify(newPackage, null, 2)),
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
}

/**
 * Updates the package.json file with the new server port for federated script.
 * @param {string} newServerPort
 */
async function changePorts(newFederatedServerPort, newStorybookPort) {
  const federatedServerPort = newFederatedServerPort || "3001";
  const storybookPort = newStorybookPort || "6006";
  try {
    const newPackage = await createNewPackageJson(
      federatedServerPort,
      storybookPort
    );
    await writeNewPackageJson(newPackage);
    const newConfigFile = await createNewConfigFile(federatedServerPort);
    await writeNewConfigFile(newConfigFile);
  } catch (err) {
    console.log(err);
  }
}
module.exports = { changePorts };
