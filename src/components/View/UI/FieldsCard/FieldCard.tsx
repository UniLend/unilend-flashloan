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

  return (
    <>
      <div className={`${'dark'} card field-card`}>
        <div className="card-body py-2">
          <div className="row">
            <div className=" col-6 col-md-6">
              <label className="form-label">{props.fieldLabel}</label>
              <input
                type={props.fieldType}
                value={props.fieldValue}
                className="form-control field-input"
                placeholder="0.0"
                onChange={(e) => {}}
              />
            </div>
            <div className=" col-6 col-md-6">
              <div className="align-end">
                <label className="form-balance-label">
                  Selected TokenS
                </label>
              </div>
              <div className="align-end">
               
                    <button
                      className="btn btn-max"
                      onClick={() =>{}}
                    >
                      <p className="max-text">MAX</p>
                    </button>
                  
                <button
                  className="btn btn-curr ml-2"
                  onClick={() =>{}}
                >
                  {/* {activeCurrency.symbol !== "Select Token" && (
                    <img
                      className="curr-image"
                      src={props.selectedLogo}
                      alt=""
                      onError={addDefaultSrc}
                    />
                  )} */}
                  <p className="curr-text">Select</p>
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
