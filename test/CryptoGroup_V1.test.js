const { expect } = require("chai");
const { BN } = require("@openzeppelin/test-helpers");
const CryptoGroup_V1 = artifacts.require("./contracts/CryptoGroup_V1");

contract("cryptoGroup_V1 (proxy)", function (accounts) {
	console.log("accounts", accounts);
	const [adminOwner, userAccount, anotherAccount] = accounts;
	const tokenAmount = "200";
	const excessAmountToken = "200000000";

	beforeEach(async function () {
		CryptoGroup_V1 = await ethers.getContractFactory("CryptoGroup_V1");
		cryptoGroup_V1 = await cryptoGroup_V1.deploy();
		await cryptoGroup_V1.deployed();
	});

	// Test case
	it("set owner of the contract", async function () {
		// Store a value
		await cryptoGroup_V1.createOwner(adminOwner);

		// Test if the returned value is the same one
		expect(await cryptoGroup_V1.retrieveOwner()).to.equal(adminOwner);
	});

	it("should send token to an address", async function () {
		await cryptoGroup_V1.createOwner(adminOwner);
		await cryptoGroup_V1.sendToken(userAccount, tokenAmount, {
			from: adminOwner,
			value: excessAmountToken,
		});

		var getUserBalance = await web3.eth.getBalance(userAccount);
		console.log("current user balance", getUserBalance);
		expect(getUserBalance).to.greaterThanOrEqual(tokenAmount);
	});
});

// describe("cryptoGroup_V1 (proxy)", function () {
// 	// console.log("accounts", accounts);
// 	// const owner = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
// 	// const user = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// 	// const tokenAmount = "200";
// 	// const excessAmountToken = "200000000";

// });
