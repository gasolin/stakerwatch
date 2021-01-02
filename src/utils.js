/**
 * get param and return as string or array.
 * @param {boolean} returnArray return as string or array
 */
export const parseArg = (param) =>
  param && typeof param === 'string' && param.indexOf(',') > 0
    ? param.split(',').map(item => item.trim())
    : param;

/**
 * convert array or string to array
 */
export const toArray = (data) => Array.isArray(data) ? data : [data];

/**
 * get SAIHUBOT_[env] environment variable and
 * return as string or array.
 */
export const getConfig = (env, defaultValue) => {
  const param = process && process.env[`SAIHUBOT_${env}`];
  const data = parseArg(param);
  return data
    ? data
    : defaultValue;
}

/** get random item from an array. */
export const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const formatAddress = (address) => address && `${address.substring(0, 6)}..`;
