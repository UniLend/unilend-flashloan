import { FC } from "react";
import ContentCard from "../UI/ContentCard/ContentCard";

interface Props {}

const Airdrop: FC<Props> = (props) => {
  return (
    <>
      <ContentCard title="Airdrop">
        <div className="swap-root"></div>
      </ContentCard>
    </>
  );
};

export default Airdrop;
