import md5 from "crypto-js/md5";

export function getGravatarUrl(email, size = 96) {
  if (!email) return null;
  const hash = md5(email.trim().toLowerCase()).toString();
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}