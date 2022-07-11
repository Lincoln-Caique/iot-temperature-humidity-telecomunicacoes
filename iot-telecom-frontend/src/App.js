import { useContext, useEffect, useState } from 'react';

import { ContainerGraphTime } from './components/ContainerGraphTime/styles';
import BasicDatePicker from './components/Datapicker';
import { LineChart } from './components/LineChart';
import ControlledSwitches from './components/Switch';

import Image from './assets/whether_page.png';
import { ModalContext } from './context/modalContext';
import {
  Container, Whapper, Logo, ThemeProvider,
} from './styles';
import GlobalStyled from './styles/global';
import { optionsHumidity } from './useCase/OptionsHumidity';
import { optionsTemperature } from './useCase/OptionsTemperature';
import { SetTemperatureHumidity } from './useCase/SetTemperatureHumidity';

function App() {
  const { checked } = useContext(ModalContext);

  const { humidity, temperature, date } = SetTemperatureHumidity();

  const dateConvert = [];

  if (date.length !== 0) {
    date.forEach((dateUTC) => {
      const a = new Date(dateUTC);
      dateConvert.push(a.toLocaleTimeString());
    });
  }
  console.log(dateConvert);

  const labels = dateConvert;

  const temperatureGraph = {
    labels,
    datasets: [
      {
        label: 'Sensor 1',
        data: temperature,
        borderColor: 'rgb(249, 76, 102)',
        backgroundColor: 'rgb(249, 76, 102,0.5)',
      },
    ],
  };

  const humidityGraph = {
    labels,
    datasets: [
      {
        label: 'Sensor 1',
        data: humidity,
        borderColor: 'rgb(24, 116, 152)',
        backgroundColor: 'rgb(24, 116, 152,0.5)',
      },
    ],
  };

  return (
    <>
      <GlobalStyled />
      <Logo>
        <img src={Image} alt="logo com um sol e duas nuvens e um termometro" />
      </Logo>

      <ControlledSwitches />
      <ThemeProvider>    <BasicDatePicker /></ThemeProvider>

      {!checked ? (
        <Whapper>
          <Container>
            <ContainerGraphTime>
              <LineChart options={optionsTemperature} data={temperatureGraph} />

            </ContainerGraphTime>
          </Container>
        </Whapper>
      )
        : (
          <Whapper>
            <Container>
              <ContainerGraphTime>
                <LineChart options={optionsHumidity} data={humidityGraph} />

              </ContainerGraphTime>
            </Container>
          </Whapper>
        )}
    </>

  );
}

export default App;
