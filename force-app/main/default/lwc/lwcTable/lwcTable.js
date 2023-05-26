import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/tableController.getAccounts'
const COLUMNS=[
    {label:'Description' , fieldName:'description'},
    {label:'Variance', fieldName:'variance'},
    {label:'Current Year', fieldName:'cyear'},
    {label:'Previous year', fieldName:'prevyear'}
]
export default class LwcTable extends LightningElement {
    tableData
    @wire(getAccounts)
    accountHandler({data,error}){
        if(data){
            console.log(data)
            this.tableData=data
        }
        if(error){
            console.error(error)
        }
    }
}