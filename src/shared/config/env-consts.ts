const env = import.meta.env

export const API_ROOT = env.VITE_API_ROOT
export const AUTH_URL = env.VITE_AUTH_URL
export const CLIENT_ID = env.VITE_CLIENT_ID
export const REDIRECT_URI = env.VITE_REDIRECT_URI
export const SCOPE = env.VITE_SCOPE

export const APP_VERSION = env.VITE_APP_VERSION || '0.0.0'

// todo вынести в .env ???
export const S3_BUCKET_URL =
  'https://xn--3-6tb.xn--400-5cd3cbuipdid4p.xn--p1ai/anniversary/'
