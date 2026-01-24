const isLocalNetwork = window.location.hostname !== 'localhost';

export const API_URL = isLocalNetwork
  ? `http://${window.location.hostname}:3000`
  : 'http://localhost:3000';