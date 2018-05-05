const isWindow = typeof window !== 'undefined';

export function getAccount() {
  const data = isWindow && window.localStorage.getItem('account');

  return JSON.parse(data);
}

export function setAccount(param) {
  return isWindow && window.localStorage.setItem('account', JSON.stringify(param));
}
