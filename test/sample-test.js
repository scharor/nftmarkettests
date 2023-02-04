const { expect } = require("chai");
const { hardhat } = require("hardhat");
const hre = require("hardhat");
const { ethers } = require("hardhat");

describe("NFTMarketplace Contract", function() {
  let NFTMarketplace;

  beforeEach(async function() {
     NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
     NFTMarketplace = await NFTMarketplace.deploy();
  });

  it("should create a new token", async function() {
    const tokenURI = "https://ipfs.io/ipfs/QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u";
    const price = ethers.utils.parseUnits("0.01", "ether").toString();

    const instance = await NFTMarketplace.deployed();
    const tx = await instance.createToken(tokenURI, price, {
      from: (await hre.ethers.getSigners())[0]._address,
      value: price
    });
    const receipt = await tx.wait();
 
    const logs = receipt.logs;
    //console.log(logs);
    //console.log(tx);

    expect(logs).to.exist;
    const event = logs[0];
   expect(tx.v).to.equal(1);
  });
});

describe("getting all the tokens", function() {
  let NFTMarketplace;

  beforeEach(async function() {
     NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
     NFTMarketplace = await NFTMarketplace.deploy();
  });
  it("should give a empty array back", async function(){

    const instance = await NFTMarketplace.deployed();

    const tx = await instance.getAllNFTs();

    const receipt = await tx;

    const logs = receipt.logs;
    console.log(logs);
    console.log(tx);

    expect(tx.length).to.equal(0);
    expect(logs).to.undefined;

  });


});


