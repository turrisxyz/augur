import {
  invalidateMarketCreation,
  clearNewMarket
} from "modules/markets/actions/update-new-market";
import {
  MODAL_ACCOUNT_APPROVAL,
  ZERO
} from "modules/common/constants";
import makePath from "modules/routes/helpers/make-path";
import noop from "utils/noop";
import { createBigNumber } from "utils/create-big-number";
import { updateModal } from "modules/modal/actions/update-modal";
import { MY_POSITIONS } from "modules/routes/constants/views";
import { sortOrders } from "modules/orders/helpers/liquidity";
import { addMarketLiquidityOrders, clearMarketLiquidityOrders } from "modules/orders/actions/liquidity-management";
import { AppState } from "store";
import { NodeStyleCallback, NewMarket, CreateMarketData } from "modules/types";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { createMarket } from "modules/contracts/actions/contractCalls";
import { checkAccountAllowance } from "modules/auth/actions/approve-account";
import { generateTxParameterId } from 'utils/generate-tx-parameter-id';
import { generateTxParameters } from 'modules/create-market/helpers/construct-market-params';
import { createMarketRetry } from "modules/contracts/actions/contractCalls";

export function submitNewMarket(
  newMarket: NewMarket,
  marketRetry: CreateMarketData,
  retry: Boolean,
  callback: NodeStyleCallback = noop
) {
  return async (dispatch: ThunkDispatch<void, any, Action>, getState: () => AppState) => {
    const { loginAccount } = getState();

    if (!retry) {
      newMarket.orderBook = sortOrders(newMarket.orderBook);
      newMarket.endTime = newMarket.endTimeFormatted.timestamp;
      newMarket.designatedReporterAddress = newMarket.designatedReporterAddress === '' ? loginAccount.address : newMarket.designatedReporterAddress;
    }

    const market = retry ? marketRetry : newMarket;
    const hasOrders = market.orderBook && Object.keys(market.orderBook).length
    const sortOrderBook = hasOrders && sortOrders(market.orderBook);
    const pendingId = retry ? generateTxParameterId(market.txParams) : generateTxParameterId(generateTxParameters(market, true))

    if (hasOrders) {
      dispatch(
        addMarketLiquidityOrders({
          marketId: pendingId,
          liquidityOrders: sortOrderBook
        })
      );
    }

    let marketResult;
   
    if (retry) {
      marketResult = await createMarketRetry(market);
    } else {
      marketResult = await createMarket({
        outcomes: newMarket.outcomes,
        scalarDenomination: newMarket.scalarDenomination,
        description: newMarket.description,
        expirySource: newMarket.expirySource,
        designatedReporterAddress: newMarket.designatedReporterAddress,
        minPrice: newMarket.minPrice,
        maxPrice: newMarket.maxPrice,
        backupSource: newMarket.backupSource,
        endTime: newMarket.endTime,
        tickSize: newMarket.tickSize,
        marketType: newMarket.marketType,
        detailsText: newMarket.detailsText,
        categories: newMarket.categories,
        settlementFee: newMarket.settlementFee,
        affiliateFee: newMarket.affiliateFee,
        offsetName: newMarket.offsetName,
      });
    }

    if (hasOrders) {
      dispatch(clearMarketLiquidityOrders(pendingId));
      dispatch(
        addMarketLiquidityOrders({
          marketId: marketResult.address,
          liquidityOrders: sortOrderBook
        })
      );
    }
  };
}

function getHasApproval(hasOrders: Boolean, callback: NodeStyleCallback) {
  return (dispatch: ThunkDispatch<void, any, Action>, getState: () => AppState) => {
    const { loginAccount } = getState();
    if (hasOrders && createBigNumber(loginAccount.allowance).lte(ZERO)) {
      dispatch(checkAccountAllowance());
      dispatch(
        updateModal({
          type: MODAL_ACCOUNT_APPROVAL,
          continueDefault: true,
          approveOnSent: noop,
          approveCallback: (err: any, res: any) => {
            if (err) return callback(err);
            callback(null);
          }
        })
      );
    } else {
      callback(null);
    }
  };
}
