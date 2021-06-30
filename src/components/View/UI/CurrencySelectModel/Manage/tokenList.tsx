import { FC } from "react";
import { Card } from "react-bootstrap";
import { useActions } from "hooks/useActions";
import settingsLogo from "assets/settings.svg";
import useWalletConnect from "hooks/useWalletConnect";

interface Props {
  item: any;
  type?: any;
}

const TokenList: FC<Props> = ({ item, type }) => {
  const { handleTokenListToggle } = useActions();
  const { selectedNetworkId } = useWalletConnect();
  const handleActive = (id: number) => {
    handleTokenListToggle(id);
  };
  return (
    <>
      {item.name !== "Unilend Token List" &&
        item.name === "CoinGecko" &&
        selectedNetworkId !== 3 && (
          <div key={item.id} className="token-list-card">
            <div className="row">
              <div className="col-2 px-0 curr-list">
                <img className="list-icon" src={item.icon} alt="" />
              </div>
              <div className="col-7">
                <div className="row">
                  <h6 className="mb-0" style={{ textTransform: "uppercase" }}>
                    {item.name}
                  </h6>
                </div>
                <div className="row">
                  <p className="mb-0 pr-1 list-desc">{item.token} tokens</p>
                  <img className="desc-set" src={settingsLogo} alt="Settings" />
                </div>
              </div>
              <div className="col-3 p-0">
                {type !== "not-exist" ? (
                  <button
                    className="btn-radio"
                    onClick={() => {
                      handleActive(item.id);
                    }}
                  >
                    {item.isEnabled ? (
                      <>
                        <div className="radio-state">ON</div>
                        <span className="button-on"></span>
                      </>
                    ) : (
                      <>
                        <span className="button-off"></span>
                        <div className="radio-state">OFF</div>
                      </>
                    )}
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <Card className="token-detail-card">
                <Card.Header>v1.3.0</Card.Header>
                <Card.Body className="p-2">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://tokenlists.org/token-list?url=defi.cmc.eth"
                    className="sc-jKJlTe dWAPaj"
                  >
                    View list
                  </a>
                  <button>Remove list</button>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
    </>
  );
};

export default TokenList;
