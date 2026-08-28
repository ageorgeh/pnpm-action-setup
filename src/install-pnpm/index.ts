import { setFailed, startGroup, endGroup } from "@actions/core";
import { Inputs } from "../inputs";
import runSelfInstaller from "./run";
import { exec } from "child_process";
import { promisify } from "util";

export { runSelfInstaller };
const execAsync = promisify(exec);

export async function install(inputs: Inputs): Promise<string | undefined> {
  try {
    await execAsync("pnpm --version");
    return;
  } catch {}

  startGroup("Running self-installer...");
  const { exitCode, binDest } = await runSelfInstaller(inputs);
  endGroup();

  if (exitCode) {
    setFailed(`Something went wrong, self-installer exits with code ${exitCode}`);
    return undefined;
  }
  return binDest;
}

export default install;
