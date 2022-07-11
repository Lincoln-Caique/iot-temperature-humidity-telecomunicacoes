import { useContext } from 'react';

import ReceptData from '../../services/api';

import { ModalContext } from '../../context/modalContext';

export const SetDate = () => {
  ReceptData();
  const { data, value } = useContext(ModalContext);
  const start = value;
  const end = new Date(value);
  let vectorData = [];

  const a = JSON.stringify(data);

  if (value !== null) {
    end.setHours(23);
    end.setMinutes(59);

    const json = JSON.parse(a);

    vectorData = json.filter((e) => e.createdAt >= start.toISOString()
      && e.createdAt <= end.toISOString());
  }

  return vectorData;
};
