const { ethers } = require("hardhat");
const { upgrades } = require("hardhat");
const ProxyAdmin = artifacts.require("./proxy/ProxyAdmin");
const TransparentUpgradeableProxy = artifacts.require(
	"./proxy/TransparentUpgradeableProxy"
);

const proxyAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"; //to be determines afer running test

async function main() {
	console.log(proxyAddress, " original CryptoGroup_V1(proxy) address");

	const CryptoGroup_V2 = await ethers.getContractFactory("CryptoGroup_V2");
	console.log("upgrade to cryptoGroup_V2...");

	const cryptoGroup_V2 = await ProxyAdmin.upgrade(proxyAddress, CryptoGroup_V2);
	console.log(
		cryptoGroup_V2.address,
		" cryptoGroup_V2 address(should be the same)"
	);
	console.log(
		await TransparentUpgradeableProxy.implementation(CryptoGroup_V2.address),
		" getImplementationAddress"
	);
	console.log(
		await TransparentUpgradeableProxy.admin(CryptoGroup_V2.address),
		" getAdminAddress"
	);
}

main();
