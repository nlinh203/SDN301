import { userRoles } from '@constant';
import { formatNumber } from '@utils';
import moment from 'moment';
import { BiSolidCheckCircle } from 'react-icons/bi';

export const TimeBody = (value, type = 'datetime') => {
  let format = type === 'time' ? 'HH:mm:ss' : type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm:ss';
  if (value) return <p className="text-center">{moment(value).format(format)}</p>;
};

export const NumberBody = (value) => {
  if (value) return <p className="text-center">{formatNumber(value)}</p>;
  else return <p className="text-center">0</p>;
};

export const Body = (data = [], value, key = 'key', label = 'label') => {
  const item = data.find((d) => d[key] === value) || {};
  return <div className={`px-4 py-1 rounded-lg truncate ${item.color ? item.color : ''}`}>{item[label]}</div>;
};

export const RoleTitle = (fullName, role, size = 20) => {
  if (!fullName) return ''
  const rolez = userRoles.find((u) => u.key === role) || {};
  if (rolez.label) {
    if (rolez.key === 'user') return <span className="font-medium">{fullName}</span>;
    else
      return (
        <span className="flex gap-1 items-center">
          <span className="font-medium">{fullName}</span>
          <BiSolidCheckCircle size={size} className="text-primary" />
        </span>
      );
  }
};
