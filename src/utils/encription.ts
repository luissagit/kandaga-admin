import { CRYPTO_SECRET_KEY } from '@/constants';
import CryptoJS from 'crypto-js';

export function encryptData(data: string) {
  return CryptoJS.AES.encrypt(data, CRYPTO_SECRET_KEY).toString();
}

export function decryptData(ciphertext: string) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, CRYPTO_SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
