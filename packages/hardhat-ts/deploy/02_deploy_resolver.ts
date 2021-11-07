import { deployments, ethers, getNamedAccounts } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  if (hre.network.name === "mainnet" || hre.network.name === "goerli") {
    console.log(
      `Deploying OptionResolver to ${hre.network.name}. Hit ctrl + c to abort`
    );
    await sleep(10000);
  }

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy("OptionResolver", {
    from: deployer,
    args: [(await ethers.getContract("Option")).address],
    log: hre.network.name != "hardhat" ? true : false,
  });
};

export default func;

func.skip = async (hre: HardhatRuntimeEnvironment) => {
  const shouldSkip =
    hre.network.name === "mainnet" || hre.network.name === "goerli";
  return shouldSkip ? true : false;
};
func.tags = ["OptionResolver"];
func.dependencies = ["Options"];
