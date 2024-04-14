import { LightningElement, track } from 'lwc';
import getAccountData from '@salesforce/apex/AccountController.getAccountData';
import createNewAccount from '@salesforce/apex/AccountController.createNewAccount';

export default class FetchAccountData extends LightningElement {
    @track accountName = '';
    @track industry = '';
    @track phone = '';
    @track website = '';
    @track accountData;

    handleAccountNameChange(event) {
        this.accountName = event.target.value;
    }
    handleIndustryChange(event) {
        this.industry = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    handleWebsiteChange(event) {
        this.website = event.target.value;
    }
    fetchAccountData() {
        getAccountData({ accountName: this.accountName })
            .then(result => {
                this.accountData = result.account;
            })
            .catch(error => {
                console.error('Error fetching account data: ', error);
            });
    }
    reset() {
       
        this.accountName = '';
        this.accountData = null;
        this.industry='';
        this.phone='';
        this.website='';

    }
    createNewAccount() {
        const accountName = this.accountName || 'Major Cl';
        const industry = this.industry || 'ABC industry';
        const phone = this.phone || '92012';
        const website = this.website || 'Aakashk@gmail.com';
        createNewAccount({ accountName, industry, phone, website })
            .then(result => {
                console.log('New Account Created', result);
                this.fetchAccountData();
            })
            .catch(error => {
                console.error('Error while creating new Account', error);
            });
    }
}
