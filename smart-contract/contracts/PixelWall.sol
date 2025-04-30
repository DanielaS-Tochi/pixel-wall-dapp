// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PixelWall {
    uint8 public constant WIDTH = 10;
    uint8 public constant HEIGHT = 10;

    struct Pixel {
        string color; // Color HEX, ej: "#FF5733"
        address painter;
    }

    mapping(uint8 => mapping(uint8 => Pixel)) public pixels;
    mapping(address => bool) public hasPainted;

    event PixelPainted(uint8 x, uint8 y, string color, address indexed painter);

    function paintPixel(uint8 x, uint8 y, string calldata color) external {
        require(x < WIDTH && y < HEIGHT, "Out of bounds");
        require(!hasPainted[msg.sender], "Already painted a pixel");

        Pixel storage pixel = pixels[x][y];
        pixel.color = color;
        pixel.painter = msg.sender;
        hasPainted[msg.sender] = true;

        emit PixelPainted(x, y, color, msg.sender);
    }

    function getPixel(uint8 x, uint8 y) external view returns (string memory, address) {
        require(x < WIDTH && y < HEIGHT, "Out of bounds");
        Pixel memory pixel = pixels[x][y];
        return (pixel.color, pixel.painter);
    }
}
