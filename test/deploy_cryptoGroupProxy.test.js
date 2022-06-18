const { expect } = require("chai");
let { catchRevert } = require("./exceptionHelpers.js");
const { ethers, waffle } = require("hardhat");

let cryptoGroup_V2;
let CryptoGroup_V2;
let proxyAdmin;
let owner;
let addr1;
let addr2;
let addrs;

beforeEach(async function () {
	[owner, addr1, addr2, ...addrs] = await ethers.getSigners();
	proxyAdmin = await ethers.getContractFactory("ProxyAdmin");
	console.log("proxyadmin", proxyAdmin);
	let cryptoGroup_V1 = await ethers.getContractFactory("CryptoGroup_V1");
	let cryptoGroup_V2 = await ethers.getContractFactory("CryptoGroup_V2");
	let adminAddress = proxyAdmin.getProxyAdmin;
	const CryptoGroup_V1 = await upgrades.deployProxy(
		cryptoGroup_V1,
		[owner.address],
		{
			initializer: "createOwner",
		}
	);
	CryptoGroup_V2 = await proxyAdmin
		.connect(owner)
		.upgrade(CryptoGroup_V1.address, cryptoGroup_V2);
});

describe("cryptoGroup_V2 (proxy)", function () {
	// console.log("accounts", accounts);
	// Test case
	it("set owner of the contract", async function () {
		await CryptoGroup_V2.createOwner(owner.address);

		// Test if the returned value is the same one
		expect(await CryptoGroup_V2.retrieveOwner()).to.equal(owner.address);
	});

	it("should send token to an address", async function () {
		const accounts = await ethers.getSigners();
		const tokenAmount = "200";
		const excessAmountToken = "200000000";
		let CryptoGroup_V2 = await ethers.getContractFactory("CryptoGroup_V2");
		let cryptoGroup_V2 = await CryptoGroup_V2.deploy();
		await cryptoGroup_V2.deployed();
		console.log("current user balance", accounts);

		await cryptoGroup_V2.createOwner(accounts[2].address);
		await cryptoGroup_V2.sendToken(accounts[3].address, tokenAmount, {
			from: accounts[2].address,
			value: excessAmountToken,
		});
		const provider = waffle.provider;
		var getUserBalance = await provider.getBalance(accounts[3].address);

		expect(parseInt(getUserBalance)).to.greaterThanOrEqual(parseInt(tokenAmount));
	});
	it("should only allow admin to send Token", async function () {
		await cryptoGroup_V2.createOwner(accounts[0].address);
		await expect(
			cryptoGroup_V2.sendToken(accounts[1].address, tokenAmount, {
				from: accounts[1].address,
				value: excessAmountToken,
			})
		).to.be.revertedWith("sender must be an admin");
	});
});
