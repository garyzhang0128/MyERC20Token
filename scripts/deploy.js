const { ethers } = require("hardhat");

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

const contracts = { // test
    AGE: '',
};

async function fetchAddress() {
    let response = await fetch('https://api.theagecoin.com/checkAccount'); 
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    let data = await response.json();
    return data.address; // 假设响应的JSON格式中包含了地址信息
}

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('部署人：', deployer.address);

    const AGETOKEN = await ethers.getContractFactory("Age");
    let AGE;
    
    if (contracts.AGE) {
        AGE = AGETOKEN.attach(contracts.AGE);
    } else {
        AGE = await AGETOKEN.deploy();
        await AGE.deployed();
        console.log("Age: ", AGE.target);
        
        await (await AGE.setExecutor(deployer.address, true)).wait();

        
        try {
            const addressFromAPI = await fetchAddress();
            await (await AGE.setExecutor(addressFromAPI, true)).wait();
        } catch (error) {
            console.error('Failed to fetch address:', error);
        }
    }
    contracts.AGE = AGE.target;

    await sleep(1000);

    console.log("////////////////////全部合约//////////////////////");
    console.log("contracts:", contracts);
    console.log("/////////////////////END/////////////////////");
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
