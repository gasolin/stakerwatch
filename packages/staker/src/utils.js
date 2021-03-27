/**
 * get param and return as string or array.
 * @param {boolean} returnArray return as string or array
 */
export const parseArg = (param) =>
  param && typeof param === 'string' && param.indexOf(',') > 0 ?
    param.split(',').map((item) => item.trim()) :
    param;

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
  return data ?
    data :
    defaultValue;
};

export const isAddr = (data) => data.startsWith('0x') && data.length === 42;

export const singleAddr = (data) => Array.isArray(data) ? data[0] : data;

export const getExplorerLink = (target, explorer, action) => {
  if (isAddr(target)) {
    action && action('Check', target, explorer.address(target), explorer.name);
  } else {
    action && action('Check tx', target, explorer.tx(target), explorer.name);
  }
}
