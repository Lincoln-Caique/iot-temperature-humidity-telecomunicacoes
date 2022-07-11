import React, { useContext, useState } from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

import Switch from '@mui/material/Switch';

import { ModalContext } from '../../context/modalContext';
import { Whapper } from './styles';

export default function ControlledSwitches() {
  const { checked, setChecked } = useContext(ModalContext);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const color = 'white';
  const size = 30;

  return (

    <Whapper>  <FaTemperatureHigh size={size} color="#F94C66" />
      <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'controlled' }}
      /> <WiHumidity size={35} color="#187498" />

    </Whapper>
  );
}
