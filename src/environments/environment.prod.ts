export const environment = {
  production: true,
  apiUrl: window.location.origin.replace(window.location.host, `api.${window.location.host}`)
};
