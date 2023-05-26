import { api, LightningElement, track, wire } from "lwc";
import sendEmailController from "@salesforce/apex/EmailClass.sendEmailController";
import listEmailController from "@salesforce/apex/EmailClass.listEmailController";

export default class EmailLwc extends LightningElement {
    toAddress = [];
    ccAddress = [];
    subject = "";
    body = "";
    @track files = [];
    @api listViewIds
    @track dataList

    wantToUploadFile = false;
    noEmailError = false;
    invalidEmails = false;

    @wire(listEmailController,{abc:'$listViewIds'})
    listEmail({ data, error }){
    if (data)
    var result=data.map(a => a.Email)
    console.log('This is the type of '+typeof(result))
    console.log('This is data map'+result)
    this.dataList=result
    this.toAddress=result
    }
    get booleanVar(){
        if (typeof this.dataList==='undefined')
        return false
        else
        return true
    }

    toggleFileUpload() {
        this.wantToUploadFile = !this.wantToUploadFile;
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.files = [...this.files, ...uploadedFiles];
        this.wantToUploadFile = false;
    }

    handleRemove(event) {
        const index = event.target.dataset.index;
        this.files.splice(index, 1);
    }

    handleToAddressChange(event) {
        this.toAddress = event.detail.selectedValues;
    }

    handleCcAddressChange(event) {
        this.ccAddress = event.detail.selectedValues;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleBodyChange(event) {
        this.body = event.target.value;
    }

    validateEmails(emailAddressList) {
        emailAddressList = emailAddressList.filter(function( element ) {
        return element !== undefined;
        });
        let areEmailsValid;
        if(emailAddressList.length > 1) {
            areEmailsValid = emailAddressList.reduce((accumulator, next) => {
                console.log(next)
                const isValid = this.validateEmail(next);
                return accumulator && isValid;
            });
        }
        else if(emailAddressList.length > 0) {
            areEmailsValid = this.validateEmail(emailAddressList[0]);
        }
        return areEmailsValid;
    }

    validateEmail(email) {
        console.log('Email is'+email)
        console.log("In VE");
        //const res = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()s[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //console.log("res", res);
        //console.log(res.test(String(email).toLowerCase()))
        //return res.test(String(email).toLowerCase());
        const res=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        console.log(res.test(String(email).toLowerCase()))
        return res.test(String(email).toLowerCase());
    }

    handleReset() {
        this.toAddress = [];
        this.ccAddress = [];
        this.subject = "";
        this.body = "";
        this.files = [];
        this.template.querySelectorAll("c-email-input").forEach((input) => input.reset());
    }

    handleSendEmail() {
        this.noEmailError = false;
        this.invalidEmails = false;
        if (![...this.dataList,...this.toAddress, ...this.ccAddress].length > 0) {
            this.noEmailError = true;
            return;
        }
        
        if (!this.validateEmails([...this.dataList,...this.toAddress, ...this.ccAddress])) {
            this.invalidEmails = true;
            return;
        }

        let emailDetails = {
            toAddress: [...this.dataList,...this.toAddress],
            ccAddress: this.ccAddress,
            subject: this.subject,
            body: this.body,
            files: this.files
        };

        sendEmailController({ emailDetailStr: JSON.stringify(emailDetails) })
            .then(() => {
                console.log("Email Sent");
                this.toAddress = [];
                this.ccAddress = [];
                this.subject = "";
                this.body = "";
                this.files = [];
                this.template.querySelectorAll("c-email-input").forEach((input) => input.reset());
            })
            .catch((error) => {
                console.error("Error in sendEmailController:", error);
            });
    }
}