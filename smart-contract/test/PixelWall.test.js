const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PixelWall", function () {
  let pixelWall;
  let owner, otherUser;

  beforeEach(async () => {
    [owner, otherUser] = await ethers.getSigners();
    const PixelWall = await ethers.getContractFactory("PixelWall");
    pixelWall = await PixelWall.deploy();
    await pixelWall.waitForDeployment();
  });

  it("debería permitir pintar un píxel y registrar al autor", async function () {
    await pixelWall.paintPixel(1, 2, "#00FF00");
    const [color, painter] = await pixelWall.getPixel(1, 2);
    expect(color).to.equal("#00FF00");
    expect(painter).to.equal(owner.address);
  });

  it("debería impedir que una wallet pinte más de un píxel", async function () {
    await pixelWall.paintPixel(2, 3, "#FF0000");
    await expect(
      pixelWall.paintPixel(4, 5, "#0000FF")
    ).to.be.revertedWith("Already painted a pixel");
  });

  it("debería permitir que otra wallet pinte su píxel", async function () {
    await pixelWall.connect(otherUser).paintPixel(5, 5, "#ABCDEF");
    const [color, painter] = await pixelWall.getPixel(5, 5);
    expect(color).to.equal("#ABCDEF");
    expect(painter).to.equal(otherUser.address);
  });
});
