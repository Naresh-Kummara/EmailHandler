import { LightningElement, track } from 'lwc';
import sendEmail from '@salesforce/apex/EmailHandler.sendEmail';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EmailHandlers extends LightningElement {
    @track toAddress ; 
    @track fromAddress ; 
    @track body;

    handleChange(event){
        if(event.target.name == 'toEmailAddress'){
            this.toAddress = event.target.value;
        }
        if(event.target.name == 'fromEmailAddress'){
            this.fromAddress = event.target.value;
        }
        if(event.target.name == 'body'){
            this.body = event.target.value;
        }
    }
    submitDetails(){
        sendEmail({toAddress : this.toAddress, subject:'Request Access', body:this.formattedBody})
         .then((result) => {
            //this.isModalOpen = false;
            this.showToast();
          })
          .catch((error) => {
            this.showErrorToast();
            console.log('error---->', error);
            this.error = error;
          });
    }

    showToast() {
        const event = new ShowToastEvent({
            title: 'success',
            variant: 'brand' ,
            message:
                'Message sent successfully.',
        });
        this.dispatchEvent(event);
    }
    showErrorToast()
    {
        const event2 = new ShowToastEvent({
            title : 'error',
            variant : 'error',
            message : 'something went wrong',
        });
        this.dispatchEvent(event2);
    }
    get formattedBody() {
        // Replace '\n' with '<br>' for HTML rendering
        return this.body ? this.body.replace(/\n/g, '<br>') : '';
    }

}