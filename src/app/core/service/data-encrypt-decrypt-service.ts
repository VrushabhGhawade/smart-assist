import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DataEncryptDecryptService {

  secretKey = "Abcd"


  encrypt(plaintext:string): string {
    return  CryptoJS.AES.encrypt(plaintext, this.secretKey).toString();

  }
  decrypt(ciphertext:string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }


}
