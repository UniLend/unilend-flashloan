import { useTypedSelector } from "hooks/useTypedSelector";
import { capitalize } from "lodash";
import { FC } from "react";
import AlertImg from "assets/warning-standalone.svg";

interface Props {
  activeTab: string;
  isChecked: boolean;
  onChecked: () => void;
}

export const RiskApproval: FC<Props> = ({
  activeTab,
  isChecked,
  onChecked,
}) => {
  const { theme } = useTypedSelector((state) => state.settings);

  return (
    <>
      <div className={`${theme} card field-card mt-4`}>
        <div className="card-body py-2">
          <div className="w-100 align-items-center text-center pr-0 mr-0">
            <div className="alerticon justify-content-center d-flex w-100">
              <img className="icon" src={AlertImg} alt="alert" />
            </div>
            <p className="mb-0 mt-3 warning-lead-text">
              The amount you {capitalize(activeTab)}, will be deducted from your
              wallet permanently and added to the reward pool.
            </p>
            <p className="mb-0 mt-3 warning-note-text ">
              Please Note: This transaction is irreversible
            </p>
            <div className="checkbox-custom mt-3 d-flex align-items-center justify-content-center">
              <input type="checkbox" checked={isChecked} onChange={onChecked} />
              <label className="warning-note-text">I Understand</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
