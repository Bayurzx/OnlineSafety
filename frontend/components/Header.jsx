import {  useEffect } from "react";
import { useMoralis } from "react-moralis";
const Header = () => {
    const { enableWeb3, isWeb3Enabled, isWeb3EnableLoading, account, Moralis, deactivateWeb3 } = useMoralis()


    useEffect(() => {
        const storedConnected = window?.localStorage.getItem("connected");
        if (!isWeb3Enabled && typeof window !== "undefined" && storedConnected) {
            enableWeb3();
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`);
            if (newAccount === null) {
                window?.localStorage.removeItem("connected"); // to prevent the condition of enableWeb3(); in above useEffect 
                deactivateWeb3(); // will change isEnabled to false if not already
                console.log("Null Account found");
            }
        });
    }, []);

    const connectButton = async () => {
        await enableWeb3();
        window?.localStorage.setItem("connected", "true");
    };

    return (
        <div>
            {/* {console.log(`Hey is isWeb3Enabled ${isWeb3Enabled}`)} */}
            <button onClick={connectButton} disabled={isWeb3EnableLoading}>{account ? "Connected" : "Connect"}</button>
            <br />
            {account}
        </div>
    )
}

export default Header;