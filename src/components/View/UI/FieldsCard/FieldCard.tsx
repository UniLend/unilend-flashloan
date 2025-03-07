import React, { FC, useEffect, useRef } from "react";
import "./FieldCard.scss";
import dropdown from "../../../../assets/dropdown.svg";
import { useTypedSelector } from "hooks/useTypedSelector";
import { floatRegExp } from "components/Helpers/index";
import BigNumber from "bignumber.js";
// import { useActions } from "hooks/useActions";
// import useWalletConnect from "hooks/useWalletConnect";
import cantFind from "assets/cantFind.svg";

interface Props {
  fieldLabel: String;
  fieldValue: any;
  selectLabel: String;
  selectValue: String;
  selectedLogo: any;
  fieldType: string;
  setFieldValue: any;
  handleModelOpen: () => void;
  onF1Change: (e: any) => void;
  onRedeemMax: () => void;
}
const FieldCard: FC<Props> = (props) => {
  const field1: any = useRef(null);
  // const [inputValue, setInputValue] = useState("");
  const { fullUserTokenBalance, fullPoolTokenBalance } = useTypedSelector(
    (state) => state.connectWallet
  );
  const { theme, activeCurrency, activeTab } = useTypedSelector(
    (state) => state.settings
  );
  // const { getPooluTokenBalance } = useActions();
  useEffect(() => {
    field1.current.value = props.fieldValue;
  }, [props.fieldValue]);
  const onHandleTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputField = e.target.value;
    // if value is not blank, then test the regex
    if (inputField === "" || floatRegExp.test(inputField)) {
      props.onF1Change(e);
      // setInputValue(inputField);
    }
  };
  function addDefaultSrc(ev) {
    ev.target.src = cantFind;
  }
  return (
    <>
      <div className={`${theme} card field-card`}>
        <div className="card-body py-2">
          <div className="row">
            <div className=" col-6 col-md-6">
              <label className="form-label">{props.fieldLabel}</label>
              <input
                type={props.fieldType}
                ref={field1}
                value={props.fieldValue}
                className="form-control field-input"
                placeholder="0.0"
                onChange={(e) => onHandleTelephoneChange(e)}
              />
            </div>
            <div className=" col-6 col-md-6">
              <div className="align-end">
                <label className="form-balance-label">
                  {props.selectLabel !== "" &&
                  activeCurrency.symbol !== "Select Token"
                    ? `Balance: ${props.selectLabel.toLocaleString()}`
                    : ""}
                </label>
              </div>
              <div className="align-end">
                {activeCurrency.symbol !== "Select Token" &&
                  props.selectLabel !== "" && (
                    <button
                      className="btn btn-max"
                      onClick={() => {
                        if (activeTab === "redeem") {
                          props.onRedeemMax();
                          let bFullAmount = new BigNumber(fullPoolTokenBalance);
                          props.setFieldValue(
                            bFullAmount.toFixed(18, 1).toString()
                          );
                        } else {
                          let bFullAmount = new BigNumber(fullUserTokenBalance);
                          props.setFieldValue(
                            bFullAmount.toFixed(18, 1).toString()
                          );
                        }
                      }}
                    >
                      <p className="max-text">MAX</p>
                    </button>
                  )}
                <button
                  className="btn btn-curr ml-2"
                  onClick={props.handleModelOpen}
                >
                  {activeCurrency.symbol !== "Select Token" && (
                    <img
                      className="curr-image"
                      src={props.selectedLogo}
                      alt=""
                      onError={addDefaultSrc}
                    />
                  )}
                  <p className="curr-text">{props.selectValue}</p>
                  <img
                    style={{ paddingLeft: "4px", width: "12px" }}
                    src={dropdown}
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FieldCard;
