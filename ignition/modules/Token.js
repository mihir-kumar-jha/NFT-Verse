const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenModuleV2", (m) => {
    const nftStore = m.contract("NFTSTORE");
    return { nftStore };
});
