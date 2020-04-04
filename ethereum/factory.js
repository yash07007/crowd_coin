import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xb202a34c017b4a2679aa8c178a6ac6d7b7bce670"
);

export default instance;
