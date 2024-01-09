const { ethers, upgrades } = require("hardhat");


function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const contracts = {// test
    AGE: '',
}


async function main() {
    const [deployer] = await ethers.getSigners();

    var now = Math.round(new Date() / 1000);
    console.log('部署人：', deployer.address);


    const AGETOKEN = await ethers.getContractFactory("Age");
    if (contracts.AGE) {
        var AGE = AGETOKEN.attach(contracts.AGE);
    } else {
        // AGE = await upgrades.deployProxy(AGETOKEN, ['Age', 'AGE'], {initializer: 'initialize', unsafeAllow: ['delegatecall']});
        // await AGE.deployed();
        AGE = await AGETOKEN.deploy();
        // await AGE.deployed();
    }
    contracts.AGE = await AGE.target; 
    
    // console.log ("Age: ", AGE.address);
    console.log ("Age: ", AGE.target);
    // await AGE.setExecutor (deployer.address, true); 
    // console.log ("setExecutor"); 
    await sleep(1000);

    console.log("////////////////////全部合约//////////////////////");
    console.log("contracts:", contracts);
    console.log("/////////////////////END/////////////////////");


    return;



}

main()
    .then(() => process.exit())
    .catch(error => {
        console.error(error);
        process.exit(1);
    })

    //npx hardhat run --network polygon scripts/deploy.js


