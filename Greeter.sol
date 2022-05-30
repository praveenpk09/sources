//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
    string private greeting;
    string public local;

    constructor(string memory _greeting,string memory _local) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
        local=_local;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }
    function hello() external pure  returns(uint){
        return 1;
    }
}
