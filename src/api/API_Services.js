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