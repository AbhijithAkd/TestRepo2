import { api, LightningElement, track,wire } from 'lwc';
import {getRecord, getFieldValue } from 'lightning/uiRecordApi';
import DONOR_FIELD from '@salesforce/schema/Contact.IsDonor__c';
const fields = [DONOR_FIELD];
export default class DonorBadgeLwcComponent extends LightningElement {
    @api recordId
    @track isDonor
    @wire(getRecord, { recordId:'$recordId', fields})
    loadFields({error, data}){
        if(error){
            console.log(error)
        }else if(data){
            this.isDonor=getFieldValue(data, DONOR_FIELD);
            console.log(this.isDonor)
        }
    }
    get icon(){
        if(this.isDonor==true){
            return "action:new_opportunity"
        }
        else{
            return "action:new_lead"
        }
    }
    get label(){
        if(this.isDonor==true){
            return "Donorㅤ"
        }
        else{
            return "Leadㅤ"
        }
    }
    get option(){
        if(this.isDonor==true){
            return "up"
        }
        else{
            return "down"
        }
    }
    
}