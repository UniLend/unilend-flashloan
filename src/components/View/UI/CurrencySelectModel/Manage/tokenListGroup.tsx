import { FC } from "react";
import { useTypedSelector } from "hooks/useTypedSelector";
import TokenList from "./tokenList";
interface Props {}

const TokenListGroup: FC<Props> = (props) => {
  const { tokenGroupList } = useTypedSelector((state) => state.tokenManage);

  return (
    <>
      <div className="list-container">
        <div className="token-group-card">
          {tokenGroupList.map((item) => (
            <TokenList item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TokenListGroup;
