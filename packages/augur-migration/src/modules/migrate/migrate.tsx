import React, { useEffect, useState } from 'react';
import Styles from './migrate.styles.less';
import { PrimaryButton, ExternalLinkButton, formatRep } from '@augurproject/augur-comps';
import { useAppStatusStore } from '../stores/app-status';
import { ConnectAccountButton } from '../shared/connect-account-button';
import {
  convertV1ToV2Approve,
  isRepV2Approved,
  convertV1ToV2,
} from '../../utils/contract-calls';
import { useUserStore } from '../stores/user';

export const Migrate = () => {
  const { isLogged } = useAppStatusStore();
  const { loginAccount, balances } = useUserStore();
  const [isApproved, setIsApproved] = useState(false);
  loginAccount &&
    isRepV2Approved(loginAccount.library, loginAccount.account).then(
      (isApproved) => {
        setIsApproved(isApproved);
      }
    );
  console.log(isApproved);
  return (
    <div className={Styles.Migrate}>
      <span>
        <span>Migrate your V1 REP to REP V2</span>
        <span>For example 100 V1 REP will migrate to 100 REP V2.</span>
      </span>
      <div>
        <div>
          <span>V1 REP</span>
          {formatRep(balances.legacyRep).formatted}
        </div>
        <div>
          <span>V2 REP</span>
          {formatRep(balances.rep).formatted}
        </div>
      </div>
      {isLogged ? (
        <div>
          <PrimaryButton
            text="Approve"
            action={() =>
              convertV1ToV2Approve(loginAccount.library, loginAccount.account)
            }
          />{' '}
          <PrimaryButton
            text="Migrate"
            action={() => {
              convertV1ToV2(loginAccount.library, loginAccount.account);
            }}
          />
        </div>
      ) : (
        <ConnectAccountButton />
      )}
    </div>
  );
};
