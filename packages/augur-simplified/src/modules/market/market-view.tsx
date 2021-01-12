import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Styles from 'modules/market/market-view.styles.less';
import classNames from 'classnames';
import { UsdIcon, EthIcon } from 'modules/common/icons';
import SimpleChartSection from 'modules/common/charts';
import {
  AddLiquidity,
  CategoryIcon,
  CategoryLabel,
  NetworkMismatchBanner,
} from 'modules/common/labels';
import {
  PositionsLiquidityViewSwitcher,
  TransactionsTable,
} from '../common/tables';
import TradingForm, {
  DefaultMarketOutcomes,
  OutcomesGrid,
} from '../market/trading-form';
import { useAppStatusStore } from 'modules/stores/app-status';
import { YES_NO, BUY, MARKET_ID_PARAM_NAME, ETH } from 'modules/constants';
import parseQuery from 'modules/routes/helpers/parse-query';
import { USDC } from '../constants';
import { AmmExchange, MarketInfo } from '../types';
import { formatDai } from '../../utils/format-number';
import {
  getMarketEndtimeFull,
  getMarketEndtimeDate,
} from '../../utils/date-utils';
import { AddCurrencyLiquidity, ReportingStateLabel } from '../common/labels';
import { getCurrentAmms } from '../stores/app-status-hooks';

const getDetails = (market) => {
  const rawInfo = market?.extraInfoRaw || '{}';
  const { longDescription } = JSON.parse(rawInfo, (key, value) => {
    if (key === 'longDescription') {
      // added to handle edge case were details are defined as an empty string.
      const processDesc = value?.length !== 0 ? value.split('\n') : [];
      return processDesc;
    } else {
      return value;
    }
  });
  return longDescription || [];
};

const useMarketQueryId = () => {
  const location = useLocation();
  const { [MARKET_ID_PARAM_NAME]: marketId } = parseQuery(location.search);
  return marketId;
};

const CurrencyLabel = ({ name }) => {
  let content = <>Add Liquidity</>;
  switch (name) {
    case ETH: {
      content = <><span>ETH Market</span> {EthIcon}</>;
      break;
    }
    case USDC: {
      content = <><span>USDC Market</span> {UsdIcon}</>;
      break;
    }
    default:
      break;
  }
  return <span className={Styles.CurrencyLabel}>{content}</span>;
};

const MarketView = ({ defaultMarket = null }) => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState(
    DefaultMarketOutcomes[2]
  );
  const marketId = useMarketQueryId();
  const {
    isMobile,
    showTradingForm,
    actions: { setShowTradingForm },
    processed: { markets },
  } = useAppStatusStore();

  useEffect(() => {
    // initial render only.
    document.getElementById('mainContent')?.scrollTo(0, 0);
    window.scrollTo(0, 1);
  }, []);

  const market: MarketInfo = !!defaultMarket
    ? defaultMarket
    : markets[marketId];
  const endTimeDate = useMemo(
    () => getMarketEndtimeDate(market?.endTimestamp),
    [market?.endTimestamp]
  );
  // add end time data full to market details when design is ready
  const endTimeDateFull = useMemo(
    () => getMarketEndtimeFull(market?.endTimestamp),
    [market?.endTimestamp]
  );
  const amm: AmmExchange = market?.amm;

  if (!market) return <div className={Styles.MarketView} />;
  const details = getDetails(market);
  const currentAMMs = getCurrentAmms(market, markets);
  const { reportingState } = market;
  return (
    <div className={Styles.MarketView}>
      <section>
        <NetworkMismatchBanner />
        <div className={Styles.topRow}>
          <CategoryIcon categories={market.categories} />
          <CategoryLabel categories={market.categories} />
          <ReportingStateLabel {...{ reportingState, big: true }} />
          <CurrencyLabel name={amm?.cash?.name} />
        </div>
        <h1>{market.description}</h1>
        <ul className={Styles.StatsRow}>
          <li>
            <span>24hr Volume</span>
            <span>{formatDai(amm?.volume24hrTotalUSD || '0.00').full}</span>
          </li>
          <li>
            <span>Total Volume</span>
            <span>{formatDai(amm?.volumeTotalUSD || '0.00').full}</span>
          </li>
          <li>
            <span>Liquidity</span>
            <span>{formatDai(amm?.liquidityUSD || '0.00').full}</span>
          </li>
          <li>
            <span>Expires</span>
            <span>{endTimeDate}</span>
          </li>
        </ul>
        {isMobile && (
          <OutcomesGrid
            outcomes={amm?.ammOutcomes}
            selectedOutcome={amm?.ammOutcomes[2]}
            ammCash={amm?.cash}
            showAllHighlighted
            setSelectedOutcome={(outcome) => {
              setSelectedOutcome(outcome);
              setShowTradingForm(true);
            }}
            marketType={YES_NO}
            orderType={BUY}
            ammCash={amm?.cash}
          />
        )}
        <SimpleChartSection {...{ market }} />
        <PositionsLiquidityViewSwitcher ammExchange={amm} />
        {isMobile && (
          <article className={Styles.MobileLiquidSection}>
            <AddLiquidity market={market} />
            {currentAMMs.length === 1 && (
              <AddCurrencyLiquidity
                market={market}
                currency={currentAMMs[0] === USDC ? ETH : USDC}
              />
            )}
          </article>
        )}
        <div
          className={classNames(Styles.Details, {
            [Styles.isClosed]: !showMoreDetails,
          })}
        >
          <h4>Market Details</h4>
          <h5>Market Expiration: {endTimeDateFull}</h5>
          {details.map((detail, i) => (
            <p key={`${detail.substring(5, 25)}-${i}`}>{detail}</p>
          ))}
          {details.length > 1 && (
            <button onClick={() => setShowMoreDetails(!showMoreDetails)}>
              {showMoreDetails ? 'Read Less' : 'Read More'}
            </button>
          )}
          {details.length === 0 && (
            <p>There are no additional details for this Market.</p>
          )}
        </div>
        <div className={Styles.TransactionsTable}>
          <span>Transactions</span>
          <TransactionsTable transactions={amm?.transactions} />
        </div>
      </section>
      {(!isMobile || showTradingForm) && (
        <section>
          <TradingForm initialSelectedOutcome={selectedOutcome} amm={amm} />
          {!isMobile && <AddLiquidity market={market} />}
          {currentAMMs.length === 1 && (
            <AddCurrencyLiquidity
              market={market}
              currency={currentAMMs[0] === USDC ? ETH : USDC}
            />
          )}
        </section>
      )}
    </div>
  );
};

export default MarketView;
