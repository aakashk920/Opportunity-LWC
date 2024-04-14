 import { LightningElement, wire } from 'lwc';
 import getContactListForDataTable from '@salesforce/apex/contactController.getContactListForDataTable';
 const columns=[
    {label:"Name", fieldName:"Name"},
    {label:"Title", fieldName:"Title"},
    {label:"Rank", fieldName:"Rank__c", type:"number"},
    {label:"Picture", fieldName:"Picture__c", type:"url"},
    {label:"CloseAt", fieldName:"CloseAt", type:"date"}
 ];
export default class CustomStyleDataTable extends LightningElement {
    contacts;
    columns=columns;
    
    @wire(getContactListForDataTable) wiredContacts({data, error}){
        if ( data){
            this.contacts=data;
            console.log(data);
        }
        else{
            console.log(error);
        }
    }
}