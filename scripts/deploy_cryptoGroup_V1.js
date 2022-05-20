const { ethers, upgrades } = require("hardhat");
const TransparentUpgradeableProxy = artifacts.require(
	"./proxy/TransparentUpgradeableProxy"
);

async function main() {
	const CryptoGroup_V1 = await ethers.getContractFactory("CryptoGroup_V1");

	const cryptoGroup_V1 = await upgrades.deployProxy(
		CryptoGroup_V1,
		[0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0],
		{
			initializer: "createOwner",
		}
	);
	console.log(cryptoGroup_V1.address, " cryptoGroup_V1(proxy) address");
	console.log(
		await TransparentUpgradeableProxy.implementation(cryptoGroup_V1.address),
		" getImplementationAddress"
	);
	console.log(
		await TransparentUpgradeableProxy.admin(cryptoGroup_V1.address),
		" getAdminAddress"
	);
}
main();
