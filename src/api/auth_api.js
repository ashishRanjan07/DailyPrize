import {
  CONTACT_US,
  DEPOSIT,
  FETCH_ALL_COUPON,
  FETCH_BANNER_IMAGE,
  FETCH_LEADERBOARD,
  FETCH_REWARD,
  GAME_RUN_DURATION,
  SEARCH_TIME,
  VALIDATE_LOGIN,
  WITHDRAWAL,
} from './API_Services';

export const validateLogin = async data => {
  try {
    const response = await VALIDATE_LOGIN(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const fetchRewardItem = async () => {
  try {
    const response = await FETCH_REWARD();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const deposit = async data => {
  try {
    const response = await DEPOSIT(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const withdrawal = async data => {
  try {
    const response = await WITHDRAWAL(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const fetchLeaderBoard = async () => {
  try {
    const response = await FETCH_LEADERBOARD();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const fetchBannerImage = async () => {
  try {
    const response = await FETCH_BANNER_IMAGE();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const fetchAllVoucher = async () => {
  try {
    const response = await FETCH_ALL_COUPON();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const contactUs = async data => {
  try {
    const response = await CONTACT_US(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const timer = async data => {
  try {
    const response = await SEARCH_TIME(data);
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};
export const gameRunDuration = async () => {
  try {
    const response = await GAME_RUN_DURATION();
    if (!response) {
      return `Can't connect to server`;
    } else if (response?.error === true) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    return error.message;
  }
};