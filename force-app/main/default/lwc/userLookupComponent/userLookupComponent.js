import { LightningElement, track,wire } from 'lwc';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import EMAIL_FIELD from "@salesforce/schema/User.Email";
import Id from '@salesforce/user/Id';
import sendUserEmail from '@salesforce/apex/LwcLookupController.sendUserEmail';
const fields = [EMAIL_FIELD];
export default class UserLookupComponent extends LightningElement {
    @track userName
    @track userRecordId
    @track userRecordEmail
    @track currUserEmail
    @track emailSubject
    @track emailContent
    @track error
    @track dsf
    @track buttonvis=true
    currUserId= Id;
    connectedCallback(){
        this.dsf=true
    }
    onUserSelection(event){
        console.log('event'+JSON.stringify(event.detail))
        this.userName = event.detail.selectedValue;
        this.userRecordId = event.detail.selectedRecordId;
        if(this.userRecordId===null){
            this.buttonvis=true
        }
        else{
            this.buttonvis=false
        }
    }
    handleClick(event){
        this.dsf=false
    }
    @wire(getRecord, { recordId:'$userRecordId', fields})
    loadUserEmail({error, data}){
        if(error){
            console.log(error)
        }else if(data){
            this.userRecordEmail=getFieldValue(data, EMAIL_FIELD);
            console.log(this.userRecordEmail)
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
    handleSubjectChange(event){
        this.emailSubject=event.target.value
    }
    handleContentChange(event){
        this.emailContent=event.target.value
    }
    sendEmail(event){
        sendUserEmail({toEmail:this.userRecordEmail,Content:this.emailContent,subject:this.emailSubject})
        .then((result) => {
            window.location.reload()
        })
        .catch((error) => {
            this.error = error;
        });
    }

    
}