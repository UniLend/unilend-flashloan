import { Reciepent } from "ethereum/contracts";
import { ActionType } from "../action-types";
import { SettingAction } from "../actions/settingsA";
import icon from "assets/ethereum.png";

interface SettingsState {
  theme: string;
  activeTab: string | null;
  activeCurrency: any;
}

const initialState = {
  theme: localStorage.getItem("theme") || "dark",
  activeTab: localStorage.getItem("activeTab")
    ? localStorage.getItem("activeTab")
    : "deposit",
  activeCurrency: {
    name: "Ethereum",
    logoURI: icon,
    chainId: 42,
    symbol: "ETH",
    address: Reciepent,
    decimals: 18,
  },
};

const settingsReducer = (
  state: SettingsState = initialState,
  action: SettingAction
): SettingsState => {
  switch (action.type) {
    case ActionType.CURRENT_THEME:
      return { ...state, theme: action.payload };
    case ActionType.SET_ACTIVE_TAB:
      localStorage.setItem(
        "activeTab",
        action.payload ? action.payload : "deposit"
      );
      return {
        ...state,
        activeTab: action.payload ? action.payload : "deposit",
      };
    case ActionType.ACTIVE_CURRENCY:
      return { ...state, activeCurrency: action.payload };
    default:
      return state;
  }
};
export default settingsReducer;
