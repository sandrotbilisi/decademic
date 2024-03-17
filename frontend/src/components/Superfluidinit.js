import { Framework } from "@superfluid-finance/js-sdk";

export async function initializeSuperfluid() {
    const sf = await Framework.create({
        networkName: "goerli", // Use the appropriate network
        provider: window.ethereum
    });
    return sf;
}
