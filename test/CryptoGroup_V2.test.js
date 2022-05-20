const { expect } = require("chai");
let { catchRevert } = require("./exceptionHelpers.js");

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
		await cryptoGroup_V2.createOwner(owner);

		// Test if the returned value is the same one
		expect(await cryptoGroup_V2.retrieveOwner()).to.equal(owner);
	});

	it("should send token to an address", async function () {
		await cryptoGroup_V2.createOwner(owner);
		await cryptoGroup_V2.sendToken(user, tokenAmount, {
			from: owner,
			value: excessAmountToken,
		});

		var getUserBalance = await web3.eth.getBalance(user);
		console.log("current user balance", getUserBalance);
		expect(getUserBalance).to.greaterThanOrEqual(tokenAmount);
	});
	it("should only allow admin to send Token", async function () {
		await cryptoGroup_V2.createOwner(owner);
		await catchRevert(
			cryptoGroup_V2.sendToken(user, tokenAmount, {
				from: user,
				value: excessAmountToken,
			})
		);
	});
});
