import { LightningElement,track} from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import FORMMETHOD from '@salesforce/apex/FormController.formMethod'
export default class FormLwc extends LightningElement {
    @track abc='Test'
    @track cde
    @track fgh
    @track ijk
    @track page1=true
    @track page2=false
    @track showInp=true
    handleabcchange(event){
        this.abc=event.target.value
        this.abc=='abc'?this.showInp=false:this.showInp=true
    }
    handlecdechange(event){
        this.cde=event.target.value
    }
    handlefghchange(event){
        this.fgh=event.target.value
    }
    handleijkchange(event){
        this.ijk=event.target.value
    }
    handleCancel() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    handleNext(){
        this.page1=false
        this.page2=true
    }
    handlePrevious(){
        this.page2=false
        this.page1=true
    }
    handleSave()
    {
        var obj={'abc':this.abc,'cde':this.cde,'fgh':this.fgh,'ijk':this.ijk}
        var str=JSON.stringify(obj)
        FORMMETHOD({str:str}).then(result=>{
            this.dispatchEvent(new CloseActionScreenEvent());
        })
    }
}