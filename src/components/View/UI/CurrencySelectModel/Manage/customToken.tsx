import { FC } from "react";
import cantFind from "assets/cantFind.svg";
import { useActions } from "hooks/useActions";

interface Props {
  token: any;
}

const CustomToken: FC<Props> = ({ token }) => {
  const { logo, symbol, address } = token;
  const { setCustomToken } = useActions();
  const handleRemoveToken = () => {
    setCustomToken(address, "delete");
  };

  return (
    <>
      <div className="token-list">
        <div className="details">
          <img src={logo !== null ? logo : cantFind} alt="token-logo" />
          <span style={{ paddingLeft: "10px" }}>{symbol}</span>
        </div>
        <div className="action">
          <svg
            onClick={handleRemoveToken}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="delete"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`https://etherscan.io/address/${address}`}
            className="sc-eNQAEJ bJDHdm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="view"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default CustomToken;
