const hre = require("hardhat");

async function main() {
    // Создаем фабрику для контракта DataTypesPractice
    const DataTypesPracticeFactory = await hre.ethers.getContractFactory("DataTypesPractice");

    // Деплоим контракт DataTypesPractice
    const DataTypesPractice = await DataTypesPracticeFactory.deploy();

    // Ожидаем успешное развертывание контракта
    const contractAddr = await DataTypesPractice.deployed();

    // await DataTypesPractice.waitForDeployment();
    // const contractAddr = await DataTypesPractice.getAddress();
    // console.log("DataTypesPractice deployed to:", contractAddr);

    console.log(`DataTypesPractice deployed to: ${DataTypesPractice.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
