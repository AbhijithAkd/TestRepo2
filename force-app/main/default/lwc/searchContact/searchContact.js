import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
columns=[
    {label: 'Name', fieldName: 'Name'},
    {label: 'Related Client', fieldName: 'Related_Client__c'},
    {label: 'Phone', fieldName: 'Phone'},
    {label: 'Created By', fieldName: 'CreatedBy'},
    {label: 'Created By', fieldName: 'CreatedDate'},
    {label: 'Last Modified', fieldName: 'LastModified'}
]
export default class FormFill extends LightningElement {
Data
columns = columns;
strSearchConName = '';
@api objectApiName;
handleContactName(event) {
    this.errorMsg = '';
    this.strSearchConName = event.target.value;
}
closeAction(){
    this.dispatchEvent(new CloseActionScreenEvent());
}
handleSearch(){
    console.log('Searchingggg..')
}

   
}