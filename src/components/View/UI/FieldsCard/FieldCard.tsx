import React, { FC, useEffect, useRef } from "react";
import "./FieldCard.scss";
import icon from "../../../../assets/htLogo.svg";
import dropdown from "../../../../assets/dropdown.svg";
interface Props {
  fieldLabel: String;
  fieldValue: any;
  selectLabel: String;
  selectValue: String;
  selectedLogo: any;
  fieldType: string;
  handleModelOpen: () => void;
  onF1Change: (e: any) => void;
}
const FieldCard: FC<Props> = (props) => {
  const field1: any = useRef(null);

  useEffect(() => {
    console.log(props);
    field1.current.value = props.fieldValue;
  }, [props.fieldValue]);
  return (
    <>
      <div className="card field-card">
        <div className="card-body py-2">
          <div className="row">
            <div className=" col-6 col-sm-7">
              <label className="form-label">{props.fieldLabel}</label>
              <input
                type={props.fieldType}
                ref={field1}
                className="form-control field-input"
                placeholder="0.0"
                onChange={props.onF1Change}
              />
            </div>
            <div className=" col-6 col-sm-5">
              <div className="align-end">
                <label className="form-label">{props.selectLabel}</label>
              </div>
              <div className="align-end">
                <button
                  className="btn btn-curr"
                  onClick={props.handleModelOpen}
                >
                  <img
                    className="curr-image"
                    src={props.selectedLogo}
                    alt="Curr"
                  />
                  <p className="curr-text">{props.selectValue}</p>
                  <img
                    style={{ paddingLeft: "4px", width: "12px" }}
                    src={dropdown}
                    alt="Curr"
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
