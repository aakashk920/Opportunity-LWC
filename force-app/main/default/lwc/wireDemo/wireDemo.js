import { LightningElement, wire } from 'lwc';
import getParentAccounts from '@salesforce/apex/accountHelper.getParentAccounts';

export default class WireDemo extends LightningElement {
    parentoptin = [];
    selParentAcc = "";
    @wire(getParentAccounts) wired_getParentAccount({ data, error }) {
        this.parentoptions = [];

        if (data) {
            this.parentoption = data.map((curritem) => ({
                label: curritem.Name,
                value: curritem.Id

            }));
        }
        else if (error) {
            console.log("Ërror while getting parent account")
        }
    }
    handleChange(event) {
        let { name, value } = event.target;
        if (name === "parentacc") {
            this.selParentAcc = value;
        }
    }

}