// const shell = require("shelljs");
const fs = require("fs").promises;

/**
 * Reads the package.json file and returns the contents as a string.
 * @returns {Promise<string>} - Returns the contents of the package.json file.
 */
async function readPackageJson() {
  const pathToPackageJson = `${process.cwd()}/package.json`;

  try {
    const packageJson = await fs.readFile(pathToPackageJson).catch((err) => {
      throw err;
    });
    return packageJson;
  } catch (err) {
    console.log(err);
  }
}

/**
 * Creates a new package.json file with the new server port for federated script.
 * @param {string} newServerPort - The new server port to be used.
 * @returns {object} - Returns the new package.json object.
 */
async function createNewPackageJson(newServerPort) {
  const portRegex = /\d+$/;
  const serverPort = newServerPort || "3001";

  try {
    const oldPackage = await readPackageJson();
    let packageJson = JSON.parse(oldPackage);
    let fedServerScript = packageJson.scripts.federate;
    let newServerScript = fedServerScript.replace(portRegex, serverPort);
    packageJson.scripts.federate = newServerScript;
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
async function changePorts(newServerPort) {
  try {
    const newPackage = await createNewPackageJson(newServerPort);
    await writeNewPackageJson(newPackage);
  } catch (err) {
    console.log(err);
  }
}
module.exports = { changePorts };
