
/**
 * 
 * @param {string} path 
 * @returns Module
 */
export const importModule = async (path) => {
  try {
    return await import(path)
  } catch (error) {
    return new Error(error);
  }
}

// export const copyState = () => {}

export const isPC = () => {
  const userAgentInfo = navigator.userAgent || window.navigator.userAgent;
  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  for (let i = 0; i < agents.length; i++) {
    if (userAgentInfo.indexOf(agents[i]) !== -1) return false;
  }
  return true;
}
 