import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  encryptSecretKey= environment.encryptSecretKey;
  
  constructor() { }
  encryption (msg:any) {
    let  pass=this.encryptSecretKey;
    // random salt for derivation
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    // well known algorithm to generate key
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: 100
      });
    // random IV
    var iv = CryptoJS.lib.WordArray.random(128/8);      
    // specify everything explicitly
    var encrypted = CryptoJS.AES.encrypt(msg, key, { 
      iv: iv, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC        
    });
    // combine everything together in base64 string
    var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
    return result;
  }
}
