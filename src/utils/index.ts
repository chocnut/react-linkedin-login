export const getIsMobile = () => {
  let isMobile = false;

  try {
    isMobile = !!(
      (window.navigator && window.navigator.standalone) ||
      navigator.userAgent.match("CriOS") ||
      navigator.userAgent.match(/mobile/i)
    );
  } catch (ex) {
    // noop
  }

  return isMobile;
};
