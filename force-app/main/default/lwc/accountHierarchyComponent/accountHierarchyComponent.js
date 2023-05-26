import { api, LightningElement, track,wire} from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountHierarchyComponentController.findAllHierarchyAccounts';
const COLLS = [
    {
        type: 'url',
        fieldName: 'AccountURL',
        label: 'Company Name',
        typeAttributes: {
            label: { fieldName: 'accountName' },
            target: '_self',
            tooltip: { fieldName: 'accountName' }
        },
        cellAttributes: {
            iconName: { fieldName: 'pinIcon' },
            iconPosition: 'right',
        }
    },
    {
        type: 'text',
        fieldName: 'BillingCountry',
        label: 'Billing Country'
    },
    {
        type: 'text',
        fieldName: 'BillingCity',
        label: 'Billing City'
    },
    {
        type: 'text',
        fieldName: 'BillingState',
        label: 'Billing State'
    },
    {
        type: 'text',
        fieldName: 'BillingPostalCode',
        label: 'Billing Zip'
    }
    
];
export default class AccountHierarchyComponent extends LightningElement {
    @track gridColumns = COLLS;
    @track gridData = [];
    @track roles = {};
    @track currentExpandedRows=[];
    @api recordId;
    @api objectApiName;
    @wire(fetchAccounts, { recordId: '$recordId'})
    AllAccountInfo({ error, data }) {
        if (error) {
            console.error("error loading accounts", error);
        } else if (data) {
            console.log('*****dat from apex:'+JSON.stringify(data));
            console.log('**ObjectAPI Name:'+this.objectApiName+'***current account Id:'+this.recordId);
            var finaldata=[];
            var expandedRowInfo=[];
            this.roles[undefined] = { Name: "Root", _children: [] };
            const parentVal = new Set();
            for ( var i = 0; i < data.length; i++ ) {
                parentVal.add(data[i].ParentId)
            }
            for ( var i = 0; i < data.length; i++ ) {
                    if(parentVal.has(data[i].Id))
                    {
                    expandedRowInfo.push(data[i].Id);
                    this.roles[data[i].Id] = { 
                        accountName: data[i].Name,
                        pinIcon: data[i].Id==this.recordId?'utility:pin':'',
                        Id: data[i].Id, 
                        AccountURL:'/'+data[i].Id,
                        BillingCountry:data[i].BillingCountry?data[i].BillingCountry:'',
                        BillingCity:data[i].BillingCity?data[i].BillingCity:'',
                        BillingState:data[i].BillingState?data[i].BillingState:'',
                        BillingPostalCode:data[i].BillingPostalCode?data[i].BillingPostalCode:'',
                        _children: [] 
                    };
                }
                else{
                    this.roles[data[i].Id] = { 
                        accountName: data[i].Name,
                        pinIcon: data[i].Id==this.recordId?'utility:pin':'',
                        Id: data[i].Id, 
                        AccountURL:'/'+data[i].Id,
                        BillingCountry:data[i].BillingCountry?data[i].BillingCountry:'',
                        BillingCity:data[i].BillingCity?data[i].BillingCity:'',
                        BillingState:data[i].BillingState?data[i].BillingState:'',
                        BillingPostalCode:data[i].BillingPostalCode?data[i].BillingPostalCode:''
                }
            }
            }
            console.log("Parent"+JSON.stringify(this.roles))
            for ( var i = 0; i < data.length; i++ ) {
                this.roles[data[i].ParentId]._children.push(this.roles[data[i].Id]);
                }
            console.log('***after adding childrens :'+JSON.stringify(this.roles));
            this.gridData=this.roles[undefined]._children
            console.log('gd'+JSON.stringify(this.gridData))
            console.log('gridData'+JSON.stringify(this.gridData))
            this.currentExpandedRows=expandedRowInfo;
            console.log('currentExpandedRows'+this.currentExpandedRows)
            //console.log('***currentExpandedRows 2:'+JSON.stringify(this.currentExpandedRows));
        }
    }
}