import axios from 'axios';

export const fetchAccounts = async () => {
    const { data } = await axios.get(
      "https://paloma-financial-auditor-0aff70148dbe.herokuapp.com/accounts "
    );
    return data;
  };