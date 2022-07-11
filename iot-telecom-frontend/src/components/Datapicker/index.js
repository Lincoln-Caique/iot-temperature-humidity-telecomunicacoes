import { useContext } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { ModalContext } from '../../context/modalContext';
import { Container } from './styles';

function BasicDatePicker() {
  const { value, setValue } = useContext(ModalContext);

  return (

    <LocalizationProvider
      id="local"
      dateAdapter={AdapterDateFns}
    >
      <Container>
        <DatePicker
          id="date"
          label="Período de Análise"
          value={value}
          inputFormat="dd/MM/yyyy"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              id="text"
              {...params}
              size="small"
            />
          )}

        />
      </Container>
    </LocalizationProvider>

  );
}

export default BasicDatePicker;
