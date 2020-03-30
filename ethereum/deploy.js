const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const secretWords =
  "cry pyramid cave injury rude proof federal unknown miss blade only couch";
const InfuraAPI =
  "https://rinkeby.infura.io/v3/2d54a1eb7e2c445dbf3f49f3bdca6e46";

const provider = new HDWalletProvider(secretWords, InfuraAPI);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to ", result.options.address);
};
deploy();
