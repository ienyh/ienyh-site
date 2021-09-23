
export const isPC = () => {
  const userAgentInfo = navigator.userAgent || window.navigator.userAgent;
  const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  for (let i = 0; i < agents.length; i++) {
    if (userAgentInfo.indexOf(agents[i]) > 0) return false;
  }
  return true;
}
 