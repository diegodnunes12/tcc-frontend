import * as CryptoJS from 'crypto-js';

export class CriptografarSenhas {
  constructor() { }

  static criptografarSenhas(senha: string) {
    let _key = CryptoJS.enc.Utf8.parse("0123456789123456");
    let _iv = CryptoJS.enc.Utf8.parse("0123456789123456");
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(senha), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }
}
