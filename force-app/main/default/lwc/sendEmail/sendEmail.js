import { api, LightningElement,track,wire} from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import { getRecords } from "lightning/uiRecordApi";
import EMAIL_FIELD from "@salesforce/schema/User.Email";
import getResults from '@salesforce/apex/emailSendController.getResults';
import Template_Type from "@salesforce/apex/emailSendController.f_Get_Templates";
import sendUserEmail from '@salesforce/apex/emailSendController.sendUserEmail';
const fields = [EMAIL_FIELD];
export default class SendEmail extends LightningElement {
    @track userName
    @track userRecordId
    @track userRecordEmail
    @track currUserEmail
    @track emailSubject
    @track emailContent
    @track error
    @track dsf
    @track buttonvis=true
    @track TemplateOptions
    @track Picklist_Value
    @track toAddresses
    @api recordId
    currUserId= Id;
    connectedCallback(){
        this.dsf=true
    }
    onUserSelection(event){
        console.log('event tthis'+JSON.stringify(event.detail))
        this.userName = JSON.stringify(event.detail.map(a=>a.recName));
        console.log(JSON.stringify(this.userName))
        this.userRecordId = JSON.stringify(event.detail.map(a=>a.recId));;
        if(this.userRecordId.length===0){
            this.buttonvis=true
        }
        else{
            this.buttonvis=false
        }
    }
    handleClick(event){
        this.dsf=false
    }
    Previous(event){
        this.dsf=true
    }
    
    @wire(getResults,{idlist:'$userRecordId'})
    loadUserEmail({error, data}){
        if(error){
            console.log(error)
        }else if(data){
            console.log('ith'+data)
            var em=JSON.stringify(data)
            this.toAddresses=data
            this.userRecordEmail=em.replaceAll('"','').replaceAll('[','').replaceAll(']','')
            console.log('ith2'+JSON.stringify(this.userRecordEmail))
        }
    }
    @wire(getRecord, { recordId:'$currUserId', fields})
    loadCurrEmail({error, data}){
        if(error){
            console.log(error)
        }else if(data){
            this.currUserEmail=getFieldValue(data, EMAIL_FIELD);
            console.log(this.currUserEmail)
        }
    }

    @wire(Template_Type, {})
    WiredObjects_Type({ error, data }) {
 
        if (data) {
            try {
                this.l_All_Types = data; 
                let options = [];
                 
                for (var key in data) {
                    options.push({ label: data[key].Name, value: data[key].Id  });

                }
                this.TemplateOptions = options;
                 
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
 
    }
 
    handleTemplateChange(event){
        this.Picklist_Value = event.target.value; 
        console.log('pick'+this.Picklist_Value)
    }
    sendEmail(event){
        sendUserEmail({toEmail:this.toAddresses,template:this.Picklist_Value,recId:this.recordId})
        .then((result) => {
            window.location.reload()
        })
        .catch((error) => {
            this.error = error;
        });
    }
}