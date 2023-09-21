import { DownOutlined } from '@ant-design/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from 'antd'
import Image from 'next/image'

interface IButtonProp {
    connectWalletText: string
    wrongNetworkText: string
}

const ButtonConnectWallet = ({
    connectWalletText,
    wrongNetworkText,
}: IButtonProp) => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                const ready = mounted
                const connected = ready && account && chain

                return (
                    <div>
                        {(() => {
                            if (!connected) {
                                return (
                                    <Button
                                        onClick={openConnectModal}
                                        type="default"
                                        size="large"
                                        className="text-base font-normal text-primary"
                                    >
                                        {connectWalletText}
                                    </Button>
                                )
                            }

                            if (chain.unsupported) {
                                return (
                                    <Button
                                        onClick={openChainModal}
                                        type="default"
                                        size="large"
                                        className="flex items-center text-base font-normal "
                                        danger
                                    >
                                        {wrongNetworkText}
                                        <DownOutlined
                                            style={{ marginLeft: '8px' }}
                                        />
                                    </Button>
                                )
                            }

                            return (
                                <div>
                                    <button
                                        onClick={openChainModal}
                                        className="flex items-center gap-2 py-1 text-sm text-white"
                                        type="button"
                                    >
                                        {chain.iconUrl && (
                                            <Image
                                                src={chain.iconUrl}
                                                alt={chain.name ?? 'Chain icon'}
                                                width={24}
                                                height={24}
                                            />
                                        )}
                                        {chain.name}
                                        <DownOutlined className="h-[10px] w-[10px] text-white"/>
                                    </button>
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}

export default ButtonConnectWallet
