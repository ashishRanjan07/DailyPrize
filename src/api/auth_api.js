import {
  ADD_POINTS,
  COIN_BALANCE,
  CONTACT_US,
  DEPOSIT,
  DEPOSIT_HISTORY,
  FETCH_ALL_COUPON,
  FETCH_BANNER_IMAGE,
  FETCH_LEADERBOARD,
  FETCH_QR_IMAGE,
  FETCH_REWARD,
  GAME_RUN_DURATION,
  JOIN_GAME_ADD_COUPON,
  NOTIFICATION,
  POINT_HISTORY,
  REGISTRATION,
  SCRATCH_RANDOM_POINT,
  SEARCH_TIME,
  VALIDATE_LOGIN,
  WITHDRAWAL,
  WITHDRAWAL_HISTORY,
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
export const fetchAllVoucher = async data => {
  try {
    const response = await FETCH_ALL_COUPON(data);
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
export const scratchRandomPoint = async data => {
  try {
    const response = await SCRATCH_RANDOM_POINT(data);
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
export const registration = async data => {
  try {
    const response = await REGISTRATION(data);
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
export const fetchCoinBalanceCount = async data => {
  try {
    const response = await COIN_BALANCE(data);
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
export const pointHistory = async data => {
  try {
    const response = await POINT_HISTORY(data);
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
export const depositHistory = async data => {
  try {
    const response = await DEPOSIT_HISTORY(data);
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
export const withdrawalHistory = async data => {
  try {
    const response = await WITHDRAWAL_HISTORY(data);
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
export const qrCode = async () => {
  try {
    const response = await FETCH_QR_IMAGE();
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
export const notificationData = async data => {
  try {
    const response = await NOTIFICATION(data);
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
export const addPoints = async data => {
  try {
    const response = await ADD_POINTS(data);
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
export const joinGameAddCoupon = async data => {
  try {
    const response = await JOIN_GAME_ADD_COUPON(data);
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
