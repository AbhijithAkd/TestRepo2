import { LightningElement,track,wire} from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { getRecord} from 'lightning/uiRecordApi';
import getcontentversion from "@salesforce/apex/FileUploadController.getcontentversion";
const contentFIELDS = [
    IsEncrypted
];
export default class FileUpload extends LightningElement {
    @track contentDocument
    @track contentversionid
    handleUploadFinished(event){
        this.contentDocument=event.detail.files[0].documentId
        getcontentversion({
            myId:this.contentDocument
           }).then((result)=>{
            this.contentversionid=result
           })
    }
    @wire(getRecord, { recordId:'$contentversionid', fields: contentFIELDS})
    contentver({error, data}){
        if(error){
            console.log('ER'+JSON.stringify(error))
        }else if(data){
            console.log('Test')
            console.log(JSON.stringify(data))
        }
    }
    handleCancel() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    handleSave(){
        this.document.text().then(x=> {
            console.log("isEncrypted", x.includes("Encrypt")) 
        })
    }
    
    
}