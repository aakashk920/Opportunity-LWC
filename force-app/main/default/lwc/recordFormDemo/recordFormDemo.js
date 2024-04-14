import { LightningElement, api } from 'lwc';
import NAME_FIELD from "@salesforce/schema/Account.Name";
import RATING_FIELD from "@salesforce/schema/Account.Rating";

import { showToastEvent } from "lightning/platformShowToastEvent";

export default class RecordFormDemo extends LightningElement {
    @api recordId;
    @api objectApiName;
    fieldList=[NAME_FIELD, RATING_FIELD];

    showToast(){
        const event=new showToastEvent({
            title:"Success",
            message:"Record Updated Successfully",
            variant: "success"
        });
        this.dispatchEvent(event);
    }
}