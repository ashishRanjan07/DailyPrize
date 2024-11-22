import axios from 'axios';
export const serverAddress = 'https://game.igvault.cloud/api';

const keys = 'game@123';
export const VALIDATE_LOGIN = async data => {
  const url = `${serverAddress}/login`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};

export const FETCH_REWARD = async () => {
  const url = `${serverAddress}/rewards`;
  const response = await axios
    .get(url, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};

export const WITHDRAWAL = async data => {
  const url = `${serverAddress}/add_withdrawal`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};

export const DEPOSIT = async data => {
  const url = `${serverAddress}/add_deposit`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};

export const FETCH_LEADERBOARD = async () => {
  const url = `${serverAddress}/leaderboard`;
  const response = await axios
    .get(url, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const FETCH_BANNER_IMAGE = async () => {
  const url = `${serverAddress}/banner`;
  const response = await axios
    .get(url, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const FETCH_ALL_COUPON = async () => {
  const url = `${serverAddress}/voucher_master`;
  const response = await axios
    .get(url, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const CONTACT_US = async data => {
  const url = `${serverAddress}/contact_us`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const SEARCH_TIME = async data => {
  const url = `${serverAddress}/next_game_time`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const GAME_RUN_DURATION = async () => {
  const url = `${serverAddress}/scratch_card_time`;
  const response = await axios
    .get(url, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const SCRATCH_RANDOM_POINT = async data => {
  const url = `${serverAddress}/random_point`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const REGISTRATION = async data => {
  const url = `${serverAddress}/register`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const COIN_BALANCE = async data => {
  const url = `${serverAddress}/get_wallet_point_balance`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const POINT_HISTORY = async data => {
  const url = `${serverAddress}/point_history`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const DEPOSIT_HISTORY = async data => {
  const url = `${serverAddress}/deposit_history`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const WITHDRAWAL_HISTORY = async data => {
  const url = `${serverAddress}/withdrawal_histroy`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const FETCH_QR_IMAGE = async () => {
  const url = `${serverAddress}/wallet_q_code`;
  const response = await axios
    .get(url, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const NOTIFICATION = async () => {
  const url = `${serverAddress}/notification`;
  const response = await axios
    .get(url, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
export const ADD_POINTS = async data => {
  const url = `${serverAddress}/random_point_inset`;
  const response = await axios
    .post(url, data, {headers: {keys: keys}})
    .then(res => {
      return res?.data;
    })
    .catch(error => error?.response?.data);
  return response;
};
