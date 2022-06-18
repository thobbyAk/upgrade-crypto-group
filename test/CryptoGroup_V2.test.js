const { expect } = require("chai");
let { catchRevert } = require("./exceptionHelpers.js");
const { ethers, waffle } = require("hardhat");

let cryptoGroup_V2;

describe("cryptoGroup_V2", function () {
	// console.log("accounts", accounts);
	const owner = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
	const user = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
	const tokenAmount = "200";
	const excessAmountToken = "200000000";
	beforeEach(async function () {
		cryptoGroup_V2 = await ethers.getContractFactory("CryptoGroup_V2");
		cryptoGroup_V2 = await cryptoGroup_V2.deploy();
		await cryptoGroup_V2.deployed();
	});

	// Test case
	it("set owner of the contract", async function () {
		// Store a value
		let CryptoGroup_V2 = await ethers.getContractFactory("CryptoGroup_V2");
		let cryptoGroup_V2 = await CryptoGroup_V2.deploy();
		await cryptoGroup_V2.deployed();
		const accounts = await ethers.getSigners();

		await cryptoGroup_V2.createOwner(accounts[0].address);

		// Test if the returned value is the same one
		expect(await cryptoGroup_V2.retrieveOwner()).to.equal(accounts[0].address);
	});

	it("should send token to an address", async function () {
		let CryptoGroup_V2 = await ethers.getContractFactory("CryptoGroup_V2");
		let cryptoGroup_V2 = await CryptoGroup_V2.deploy();
		await cryptoGroup_V2.deployed();
		const accounts = await ethers.getSigners();

		await cryptoGroup_V2.createOwner(accounts[0].address);
		await cryptoGroup_V2.sendToken(accounts[1].address, tokenAmount, {
			from: accounts[0].address,
			value: excessAmountToken,
		});

		const provider = waffle.provider;

		var getUserBalance = await provider.getBalance(accounts[1].address);
		console.log("current user balance", getUserBalance);
		expect(parseInt(getUserBalance)).to.greaterThanOrEqual(parseInt(tokenAmount));
	});
	it("should only allow admin to send Token", async function () {
		let CryptoGroup_V2 = await ethers.getContractFactory("CryptoGroup_V2");
		let cryptoGroup_V2 = await CryptoGroup_V2.deploy();
		await cryptoGroup_V2.deployed();
		const accounts = await ethers.getSigners();

		await cryptoGroup_V2.createOwner(accounts[0].address);
		await expect(
			cryptoGroup_V2
				.connect(accounts[1])
				.sendToken(accounts[2].address, tokenAmount)
		).to.be.revertedWith("caller must be an admin");
	});
});
