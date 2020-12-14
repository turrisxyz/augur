import React from 'react';
import Styles from 'modules/portfolio/activity.styles.less';
import { UsdIcon } from 'modules/common/icons';
import { Pagination } from 'modules/common/pagination';
import { useAppStatusStore } from 'modules/stores/app-status';
import { keyedObjToArray } from 'modules/stores/app-status-hooks';

interface ActivityData {
  date?: string;
  activity?: Array<ActivityItem>;
}

interface ActivityItem {
  id: string;
  type: string;
  currency: string;
  description: string;
  subheader: string;
  time: string;
  value: string;
}

interface ActivityCardProps {
  activity: ActivityItem;
}

const ActivityCard = ({ activity }: ActivityCardProps) => (
  <div className={Styles.ActivityCard}>
    <div>{activity.type}</div>
    <div>{activity.value}</div>
    <div>{UsdIcon}</div>
    <span>{activity.description}</span>
    <div>{activity.subheader}</div>
    <div>{activity.time}</div>
    <div>get info</div>
  </div>
);

export const Activity = () => {
  const {
    userInfo: { activity },
  } = useAppStatusStore();
  const activityArray: Array<ActivityData> = keyedObjToArray(activity);

  return (
    <div className={Styles.Activity}>
      <span>your activity</span>
      <div>
        {activityArray.map((activityGroup) => (
          <div key={activityGroup.date}>
            <span>{activityGroup.date}</span>
            <div>
              {activityGroup.activity.map((activityItem) => (
                <ActivityCard key={activityItem.id} activity={activityItem} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        page={1}
        itemCount={10}
        itemsPerPage={9}
        action={() => null}
        updateLimit={() => null}
      />
    </div>
  );
};
export default Activity;
