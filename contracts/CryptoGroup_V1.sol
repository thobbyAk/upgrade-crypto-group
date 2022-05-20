// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.6.0) (proxy/Proxy.sol)

pragma solidity ^0.8.0;

contract CryptoGroup_V1 {
    address owner;

    // constructor() {
    //     owner = payable(msg.sender);
    // }

    function createOwner(address newOwner) public {
        owner = newOwner;
    }

    function retrieveOwner() public view returns (address) {
        return owner;
    }

    function sendToken(address payable userAddress, uint256 amount)
        external
        payable
    {
        require(userAddress != address(0));
        require(msg.value >= amount);
        userAddress.transfer(amount);
    }
}
