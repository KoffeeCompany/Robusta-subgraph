import { deployments, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  if (hre.network.name === "mainnet" || hre.network.name === "goerli") {
    console.log(
      `Deploying Option to ${hre.network.name}. Hit ctrl + c to abort`
    );
    await sleep(10000);
  }

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("Option", {
    from: deployer,
    args: [
        "0xC36442b4a4522E871399CD717aBDD847Ab11FE88",
        "0xB3f5503f93d5Ef84b06993a1975B9D21B962892F",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    ],
    log: hre.network.name != "hardhat" ? true : false,
  });
};

export default func;

func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const shouldSkip =
    hre.network.name === "mainnet" || hre.network.name === "goerli";
  return shouldSkip ? true : false;
};
func.tags = ["Options"];
