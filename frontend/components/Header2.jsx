import { ConnectButton } from "web3uikit"

export default function Header2() {
    return (
        <div className="p-5 flex flex-row">
            <ConnectButton moralisAuth={false} />
        </div>
    )
}