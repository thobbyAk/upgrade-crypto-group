const { expect } = require("chai");
const { BN } = require("@openzeppelin/test-helpers");
const { ethers, waffle } = require("hardhat");

describe("cryptoGroup_V1 (proxy)", function () {
	beforeEach(async function () {
		// const CryptoGroup_V1 = await ethers.getContractFactory("CryptoGroup_V1");
		let CryptoGroup_V1 = await ethers.getContractFactory("CryptoGroup_V1");
		let cryptoGroup_V1 = await CryptoGroup_V1.deploy();
		await cryptoGroup_V1.deployed();
	});

	// Test case
	it("set owner of the contract", async function () {
		// Store a value
		let CryptoGroup_V1 = await ethers.getContractFactory("CryptoGroup_V1");
		let cryptoGroup_V1 = await CryptoGroup_V1.deploy();
		await cryptoGroup_V1.deployed();
		const accounts = await ethers.getSigners();

		await cryptoGroup_V1.createOwner(accounts[0].address);

		// Test if the returned value is the same one
		expect(await cryptoGroup_V1.retrieveOwner()).to.equal(accounts[0].address);
	});

	it("should send token to an address", async function () {
		const tokenAmount = "200";
		const excessAmountToken = "200000000";

		let CryptoGroup_V1 = await ethers.getContractFactory("CryptoGroup_V1");
		let cryptoGroup_V1 = await CryptoGroup_V1.deploy();
		await cryptoGroup_V1.deployed();
		const accounts = await ethers.getSigners();
		await cryptoGroup_V1.createOwner(accounts[0].address);
		await cryptoGroup_V1.sendToken(accounts[1].address, tokenAmount, {
			from: accounts[0].address,
			value: excessAmountToken,
		});

		const provider = waffle.provider;

		var getUserBalance = await provider.getBalance(accounts[1].address);
		console.log("current user balance", getUserBalance);
		expect(parseInt(getUserBalance)).to.greaterThanOrEqual(parseInt(tokenAmount));
	});
});

// describe("cryptoGroup_V1 (proxy)", function () {
// 	// console.log("accounts", accounts);
// 	// const owner = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
// 	// const user = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// 	// const tokenAmount = "200";
// 	// const excessAmountToken = "200000000";

// });
