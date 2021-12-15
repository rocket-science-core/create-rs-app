const shell = require("shelljs");

/**
 * Prints final success messages with instructions.
 * @param {object} answer - The answer object from the inquirer prompt
 */
async function successMessage(answer) {
  shell.echo(``);
  shell.echo(`Successfully Created A New Rocket Science App 🚀🧪`);
  shell.echo(``);
  shell.echo(
    `---------- Get started by running the following commands 👇 ----------`
  );
  shell.echo(``);
  shell.echo(`1. cd ${answer.app_name}`);
  shell.echo(`2. yarn`);
  shell.echo(`3. yarn setup`);
  shell.echo(
    `4. yarn launch (start the workspace) or yarn federate (start the federated server)`
  );
  shell.echo(``);
  shell.echo(
    `-------- Optional commands to push to your own git repository --------`
  );
  shell.echo(``);
  shell.echo(
    `5. git remote set-url origin https://github.com/user/repo.git (your remote repository)`
  );
  shell.echo(`6. git remote -v (verify new remote)`);
  shell.echo(`7. git push -u origin main`);
  shell.echo(``);
}

module.exports = { successMessage };
