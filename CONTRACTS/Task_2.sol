// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "../TEMP/asset-v1_Task2_1_.sol";

contract DataTypesPractice is IDataTypesPractice {
    int256 public int256Value = -1;
    uint256 public uint256Value = 1;
    int8 public int8Value = -1;
    uint8 public uint8Value = 1;
    bool public boolValue = true;
    address public addressValue = 0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF;
    bytes32 public bytes32Value = "Hello World!";
    uint256[5] public arrayUint5Value = [1, 2, 3, 4, 5];
    uint256[] public arrayUintValue = new uint256[](5);
    string public stringValue = "Hello World!";

    constructor() {
        arrayUintValue[0] = 1;
        arrayUintValue[1] = 2;
        arrayUintValue[2] = 3;
        arrayUintValue[3] = 4;
        arrayUintValue[4] = 5;
    }

    function getInt256() external view override returns (int256) {
        return int256Value;
    }

    function getUint256() external view override returns (uint256) {
        return uint256Value;
    }

    function getInt8() external view override returns (int8) {
        return int8Value;
    }

    function getUint8() external view override returns (uint8) {
        return uint8Value;
    }

    function getBool() external view override returns (bool) {
        return boolValue;
    }

    function getAddress() external view override returns (address) {
        return addressValue;
    }

    function getBytes32() external view override returns (bytes32) {
        return bytes32Value;
    }

    function getArrayUint5() external view override returns (uint256[5] memory) {
        return arrayUint5Value;
    }

    function getArrayUint() external view override returns (uint256[] memory) {
        return arrayUintValue;
    }

    function getString() external view override returns (string memory) {
        return stringValue;
    }

    function getBigUint() external pure override returns (uint256) {
        uint256 v1 = 1;
        uint256 v2 = 2;
        return (v1 ** v2) * v2; // Це дасть значення більше 1_000_000
    }
}
