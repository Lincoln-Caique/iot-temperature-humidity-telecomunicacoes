import { useEffect, useContext } from 'react';

import axios from 'axios';

import { ModalContext } from '../context/modalContext';

const ReceptData = () => {
  const { setData } = useContext(ModalContext);

  useEffect(() => {
    axios.get('https://link-back-end.com.br || PORT-LOCAL')
      .then((response) => {
        setData(response.data);
      });
  }, []);
};

export default ReceptData;
