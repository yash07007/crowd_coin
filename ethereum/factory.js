import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xbB61dCEf953E9D41C877740aFF0D61009fc5120a"
);

export default instance;
