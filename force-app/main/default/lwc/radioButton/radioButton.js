import { LightningElement,track,wire } from 'lwc';
import TYPE_FIELD from '@salesforce/schema/Opportunity.Type';
import { getRecord,getFieldDisplayValue, getFieldValue,createRecord,updateRecord} from 'lightning/uiRecordApi';
const fields=[TYPE_FIELD]
export default class RadioButton extends LightningElement {
    @track options = [
        { label: 'Occupier', value: 'Occupier', disabled: true },
        { label: 'Investor', value: 'Investor', disabled:true}
    ]
    @wire(getRecord, { recordId:'$recordId', fields})
    loadFields({error, data}){
        if(error){
            console.log(error)
        }else if(data){
            this.getSelection=data.fields.Type.value
            console.log(JSON.stringify(this.getSelection))
            rbtn=document.getElementsByName(JSON.stringify(this.getSelection));
            rbtn.checked=true
        }

    }

}