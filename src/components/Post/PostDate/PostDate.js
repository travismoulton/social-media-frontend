import { useState } from 'react';

import classes from './PostDate.module.css';
import Tooltip from '../../UI/Tooltip/Tooltip';

export default function PostDate({ postTimeStamp }) {
  const [tooltipData, setTooltipData] = useState({
    show: false,
    x: null,
    y: null,
    innerText: null,
  });

  function calculateTimeSincePost() {
    const postDate = new Date(postTimeStamp);

    const now = new Date();

    const timeSincePostInHours = (now - postDate) / 1000 / 60 / 60;

    if (timeSincePostInHours * 60 < 1) return 'Just now';

    if (timeSincePostInHours < 1)
      return `${Math.floor(timeSincePostInHours * 60)} minute${
        Math.floor(timeSincePostInHours * 60) > 1 ? 's' : ''
      } ago`;

    if (timeSincePostInHours < 24)
      return `${Math.floor(timeSincePostInHours).toString()} hr${
        Math.floor(timeSincePostInHours) > 1 ? 's' : ''
      } ago`;

    if (timeSincePostInHours > 24 * 31)
      return `${Math.floor(timeSincePostInHours / (24 * 31))} month${
        Math.floor(timeSincePostInHours / (24 * 31)) > 1 ? 's' : ''
      } ago`;

    if (timeSincePostInHours >= 24)
      return `${Math.floor(timeSincePostInHours / 24)} day${
        Math.floor(timeSincePostInHours / 24) > 1 ? 's' : ''
      } ago`;
  }

  function formatPostDateStr() {
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const date = new Date(postTimeStamp);

    function formatTime() {
      if (date.getHours() > 12)
        return `${date.getHours() - 12}:${date.getMinutes()} PM`;
      if (date.getHours() <= 12)
        return `${date.getHours()}:${date.getMinutes()} AM`;
    }

    return `${days[date.getDay()]} ${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()} at ${formatTime()}`;
  }

  function showTooltip(e) {
    const btnCoordinateData = e.target.getBoundingClientRect();
    setTooltipData({
      show: true,
      x: btnCoordinateData.x + btnCoordinateData.width / 2 + 'px',
      y: btnCoordinateData.y - btnCoordinateData.height - 10 + 'px',
      innerText: formatPostDateStr(postTimeStamp),
    });
  }

  function hideTooltip() {
    setTooltipData({ show: false, x: null, y: null, innerTxt: null });
  }

  const tooltip = tooltipData.show && (
    <Tooltip x={tooltipData.x} y={tooltipData.y}>
      {tooltipData.innerText}
    </Tooltip>
  );

  return (
    <>
      <p
        className={classes.Date}
        onMouseOver={showTooltip}
        onMouseOut={hideTooltip}
        data-testid="PostDate"
      >
        {calculateTimeSincePost()}
      </p>
      {tooltip}
    </>
  );
}
