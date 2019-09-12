import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { constantMetadata } from '../constantMetadata/constantMetadata'
import { passwordHash } from '../constantMetadata/passwordHash'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'Encryption Sample';
  password = passwordHash.password;
  plainText: string;
  encryptText: string;
  encPassword: string;
  decPassword: string;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;
  keyForLocalStorage: string;
  trialExpired = true;
  trialDaysLeft = 20;
  constructor() {
  }


  ngOnInit() {
    localStorage.clear();
    this.setEncryption();
  }
  //method is used to encrypt and decrypt the text  
  convertText(conversion: string) {
    if (conversion == "encrypt") {
      this.conversionEncryptOutput = CryptoJS.AES.encrypt(this.plainText.trim(), this.encPassword.trim()).toString();
    }
    else {
      this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);
    }
    localStorage.setItem("encryptedText", this.conversionEncryptOutput);
  }

  encryptLocalStorage(encryptValue) {
    return CryptoJS.AES.encrypt(encryptValue.trim(), this.password).toString();
  }
  decryptLocalStorage(cipherText) {
    return CryptoJS.AES.decrypt(cipherText.trim(), this.password).toString(CryptoJS.enc.Utf8);
  }
  setEncryption() {
    let key = this.encryptLocalStorage('name');
    constantMetadata.keyName = key;
    let value = this.encryptLocalStorage("Saurav Khatiwada");
    localStorage.setItem(key, value);

    let trialExpired = this.encryptLocalStorage('trialExpired');
    constantMetadata.trialExpired = trialExpired;
    let trialValue = this.encryptLocalStorage(this.trialExpired.toString());
    localStorage.setItem(trialExpired, trialValue);

    let trialDays = this.encryptLocalStorage('trialDays');
    constantMetadata.trialDaysLeft = trialDays;
    let trialDaysValue = this.encryptLocalStorage(this.trialDaysLeft.toString());
    localStorage.setItem(trialDays, trialDaysValue);



  }
  getDecryptedText() {
    let keyNameValue = this.decryptLocalStorage(localStorage.getItem(constantMetadata.keyName));
    console.log(keyNameValue);
    let trialExpiredValue = this.decryptLocalStorage(localStorage.getItem(constantMetadata.trialExpired));
    console.log(JSON.parse(trialExpiredValue))
    let trialDaysLeft = this.decryptLocalStorage(localStorage.getItem(constantMetadata.trialDaysLeft));
    console.log(JSON.parse(trialDaysLeft))
  }


}
