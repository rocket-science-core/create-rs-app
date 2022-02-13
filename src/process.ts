import shell from "shelljs";
import { changePorts } from "./ports";
import { getBranch } from "./helpers";
import { successMessage } from "./success";

type Answer = {
  app_name: string;
  app_language: string;
  federated_port: string;
  storybook_port: string;
};

/**
 * Execute code following inquirer prompt
 */
async function processAnswer(answer: Answer) {
  try {
    const branch = await getBranch(answer.app_language);
    shell.exec(
      `git clone --single-branch -b ${branch} https://github.com/rocket-science-core/rocket-science.git ${answer.app_name}`
    );
    shell.cd(answer.app_name);
    shell.exec(`git remote remove origin`);
    await changePorts(answer.federated_port, answer.storybook_port);
    if (branch !== "main") {
      shell.exec(`git checkout -b main`);
      shell.exec(`git branch -d ${branch}`);
    }
    await successMessage(answer);
  } catch (error) {
    console.log(error);
  }
}

export { processAnswer };
