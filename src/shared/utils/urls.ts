export const getUrlWithProtocol = (
  url: string,
  protocol: 'https' | 'http' = 'https',
) => {
  return `${protocol}://${url}`
}
