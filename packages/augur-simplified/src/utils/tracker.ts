import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { PARA_CONFIG, MAINNET } from '@augurproject/augur-comps';
import { useLocation } from 'react-router';
import {
  Utils,
} from '@augurproject/augur-comps';

const GA_TRACKING_ID = 'G-6REXDMP9F3';
let tracker = null;
const activate = PARA_CONFIG.networkId !== MAINNET;

const getTracker = () => {
  if (!tracker && activate) {
    const userId = genUserId();
    ReactGA.initialize(GA_TRACKING_ID, {
      debug: true,
      titleCase: false,
      gaOptions: {
        userId: userId,
      }
    });
    tracker = ReactGA;
  }
  return tracker;
}

const pageViewed = (page: string, data: string[]) => {
  const tracker = getTracker();
  if (tracker) {
    tracker.pageview(page, data);
  }
}

export const usePageView = () => {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const page = Utils.PathUtils.parsePath(pathname);
    const data = Utils.PathUtils.parseQuery(search)
    pageViewed(page[0], data);
  }, [pathname, search]);
}

export const useTrackedEvents = () => {
  const tradingEstimateEvents = (isBuy: boolean, outputYesShares: boolean, cashType: string, input: string, output: string, fee: string) => getTracker().plugin.execute(
    "Estimate Trade",
    isBuy ? "BUY" : "SELL", {
    shareType: outputYesShares ? "Yes Shares" : "No Shares",
    cashType,
    input,
    output,
    fee
  }
  )
  const tradingEvents = (isBuy: boolean, outputYesShares: boolean, cashType: string, input: string, output: string, fee: string) => getTracker().plugin.execute(
    "Trading",
    isBuy ? "BUY" : "SELL", {
    shareType: outputYesShares ? "Yes Shares" : "No Shares",
    cashType,
    input,
    output,
    fee
  })
  const liquidityEstimateEvents = (liquidityType: string, cashType: string, cashAmount: string, yesShares, noShares, lpTokens) => getTracker().plugin.execute(
    "Estimate Liquidity",
    liquidityType, {
    cashType,
    cashAmount,
    yesShares,
    noShares,
    lpTokens
  })
  const liquidityEvents = (liquidityType: string, cashType: string, cashAmount: string, yesShares, noShares, lpTokens) => getTracker().plugin.execute(
    "Liquidity",
    liquidityType, {
    cashType,
    cashAmount,
    yesShares,
    noShares,
    lpTokens
  })
  return { tradingEstimateEvents, tradingEvents, liquidityEstimateEvents, liquidityEvents }
}



const genUserId = () => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
