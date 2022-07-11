import React from 'react';

import { SetDate } from '../SetDate';

export const SetTemperatureHumidity = () => {
  const dataFilter = SetDate();

  const humidity = dataFilter.map((e) => parseFloat(e.humidity));
  const temperature = dataFilter.map((e) => parseFloat(e.temperature));
  const date = dataFilter.map((e) => e.createdAt);

  return ({ humidity, temperature, date });
};
