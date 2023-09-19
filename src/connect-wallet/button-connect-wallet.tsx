import { DownOutlined } from '@ant-design/icons'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from 'antd'

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
                openAccountModal,
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
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button
                                        onClick={openChainModal}
                                        style={{
                                            display: 'flex',
                                            gap: 6,
                                            alignItems: 'center',
                                            padding: '8px 10px',
                                            boxShadow:
                                                '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                            borderRadius: 12,
                                            fontWeight: 700,
                                            background: 'white',
                                        }}
                                        type="button"
                                    >
                                        {chain.hasIcon && (
                                            <div
                                                style={{
                                                    background:
                                                        chain.iconBackground,
                                                    borderRadius: 999,
                                                    overflow: 'hidden',
                                                    marginRight: 4,
                                                }}
                                            >
                                                {chain.iconUrl && (
                                                    <img
                                                        alt={
                                                            chain.name ??
                                                            'Chain icon'
                                                        }
                                                        src={chain.iconUrl}
                                                        style={{
                                                            width: 24,
                                                            height: 24,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        )}
                                        {chain.name}
                                        <DownOutlined />
                                    </button>

                                    <button
                                        onClick={openAccountModal}
                                        type="button"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            boxShadow:
                                                '0px 4px 12px rgba(0, 0, 0, 0.1)',
                                            borderRadius: 12,
                                            fontWeight: 700,
                                            background: 'white',
                                        }}
                                    >
                                        <div
                                            style={{
                                                padding: '8px 8px 8px 12px',
                                            }}
                                        >
                                            {account.displayBalance
                                                ? `${account.displayBalance}`
                                                : ''}
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: 6,
                                                alignItems: 'center',
                                                background:
                                                    'linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))',
                                                borderColor: '#FFF',
                                                height: '100%',
                                                padding: '6px 8px',
                                                margin: '1.6px',
                                                borderWidth: 2,
                                                borderStyle: 'solid',
                                                borderRadius: 12,
                                            }}
                                        >
                                            {account.ensAvatar && (
                                                <img
                                                    alt={'Avatar'}
                                                    src={account.ensAvatar}
                                                    style={{
                                                        width: 24,
                                                        height: 24,
                                                    }}
                                                />
                                            )}
                                            {account.displayName}
                                            <DownOutlined />
                                        </div>
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
