import React from 'react';
import Styles from './migrate.styles.less';
import { ButtonComps, Icons, createBigNumber, Formatter, Constants } from '@augurproject/augur-comps';
import { useAppStatusStore } from '../stores/app-status';
import { ConnectAccountButton } from '../shared/connect-account-button';
import {
  convertV1ToV2Approve,
  convertV1ToV2,
} from '../../utils/contract-calls';
import { useUserStore } from '../stores/user';
import { TransactionResponse } from '@ethersproject/providers';
import { APPROVE, MIGRATE } from '../stores/constants';

const { TX_STATUS, ZERO } = Constants;
const { PrimaryButton } = ButtonComps;
const { PointedArrow } = Icons;
const {
  formatRep,
} = Formatter;

export const Migrate = () => {
  const { isLogged } = useAppStatusStore();
  const {
    loginAccount,
    balances,
    isApproved,
    transactions,
    actions: { addTransaction, updateTxFailed },
  } = useUserStore();

  const formattedLegacyRep = formatRep(balances.legacyRep);

  const approvalPending =
    transactions.find(
      (transaction) =>
        transaction.type === APPROVE && transaction.status === TX_STATUS.PENDING
    ) !== undefined;
  const migrationPending =
    transactions.find(
      (transaction) =>
        transaction.type === MIGRATE && transaction.status === TX_STATUS.PENDING
    ) !== undefined;

  return (
    <div className={Styles.Migrate}>
      <span>
        <span>Migrate your V1 REP to REP V2</span>
        <span>For example 100 V1 REP will migrate to 100 REP V2.</span>
      </span>
      {isLogged && (
        <div>
          <div>
            <span>V1 REP</span>
            {formattedLegacyRep.formatted}
          </div>
          {PointedArrow}
          <div>
            <span>V2 REP</span>
            {formatRep(balances.rep).formatted}
          </div>
        </div>
      )}
      {isLogged ? (
        <div>
          <PrimaryButton
            text={isApproved ? 'Approved' : 'Approve'}
            disabled={isApproved !== null && isApproved}
            pending={approvalPending}
            action={() => {
              updateTxFailed(false);
              convertV1ToV2Approve(loginAccount.library, loginAccount.account)
                .then((response: TransactionResponse) => {
                  if (response) {
                    const { hash } = response;
                    addTransaction({
                      hash,
                      status: TX_STATUS.PENDING,
                      chainId: loginAccount.chainId,
                      addedTime: new Date().getTime(),
                      from: loginAccount.account,
                      message: `Approved spending REP`,
                      type: APPROVE,
                    });
                  } else {
                    updateTxFailed(true);
                  }
                })
                .catch((error: Error) => {
                  console.debug('Failed to approve', error);
                  throw error;
                });
            }}
          />{' '}
          <PrimaryButton
            text="Migrate"
            pending={migrationPending}
            disabled={
              !isApproved || createBigNumber(formattedLegacyRep.value).eq(ZERO)
            }
            action={() => {
              updateTxFailed(false);
              convertV1ToV2(loginAccount.library, loginAccount.account)
                .then((response: TransactionResponse) => {
                  if (response) {
                    const { hash } = response;
                    addTransaction({
                      hash,
                      status: TX_STATUS.PENDING,
                      chainId: loginAccount.chainId,
                      addedTime: new Date().getTime(),
                      from: loginAccount.account,
                      message: `Migrated REP`,
                      type: MIGRATE,
                    });
                  } else {
                    updateTxFailed(true);
                  }
                })
                .catch((error: Error) => {
                  console.debug('Failed to migrate', error);
                  throw error;
                });
            }}
          />
        </div>
      ) : (
        <ConnectAccountButton />
      )}
    </div>
  );
};
