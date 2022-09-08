// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.7.3/contracts/token/ERC20/ERC20.sol";

contract DeFiTeenToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("DeFiTeenToken", "DFTT") {
        _mint(msg.sender, initialSupply);
    }
}