import { api, LightningElement, wire } from 'lwc';
import AccAndCons from '@salesforce/apex/LWCWrapper.fetchAccAndCons';

export default class WrapperClassInLWC extends LightningElement {
    data;
    error;

    @api recordId
    @wire(AccAndCons,{abcd:'$recordId'})
    accs({error, data}) {
        if(data) {
            this.data = data;
            window.console.log('data ==> '+JSON.stringify(data));
        }
        else if(error) {
            this.error = error;
        }
    }
}