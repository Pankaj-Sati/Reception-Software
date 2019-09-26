import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController, AlertController, NavController, ModalController, LoadingController } from '@ionic/angular';
import { ValidatorsService } from '../../providers/validators.service';
import { DisclaimerComponent } from '../../components/disclaimer/disclaimer.component';
import { ApiValuesService } from '../../providers/apiValues.service';
import { UserDrowpdownModel } from '../../models/user_dropdown.model';
import { ClientDetails } from '../../models/client_details.model';
import { BrMaskDirective, BrMaskModel } from 'br-mask';


@Component({
  selector: 'app-client-entry',
  templateUrl: './client-entry.page.html',
  styleUrls: ['./client-entry.page.scss'],
})
export class ClientEntryPage implements OnInit 
{
    public clickedSubmitted = false; //To display errors if there is anything wrong with the form when user clicks submit button

    public checkinForm: FormGroup;

    public errorMessage = '';

    public userList: any = [];

    public modalBlurClass = ''; //Class to add blur in the background when modal is shown

    public disclaimerAccepted: boolean = true; //Whether user has accepted the disclaimer

    public isExistingClient = false; //TO know whether this user is new or existing

    constructor(public formBuilder: FormBuilder,
        public navCtrl: NavController,
        public validatorsService: ValidatorsService,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public apiValue: ApiValuesService,
        public loadingCtrl: LoadingController,
        public http: HttpClient,
        public alertCtrl: AlertController,
        
    )
    {
        this.checkinForm = this.formBuilder.group({

            client_type: new FormControl('', Validators.compose([Validators.required])),
            name: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.validatorsService.NAME_VALIDATOR)])),
            alien_no: new FormControl('', Validators.compose([Validators.pattern(this.validatorsService.ALIEN_NO_VALIDATOR)])),
            email: new FormControl('', Validators.compose([validatorsService.EMAIL_VALIDATOR])),
            contact: new FormControl('', Validators.compose([Validators.required, Validators.pattern(validatorsService.CONTACT_VALIDATOR)])),
            address: new FormControl('', Validators.compose([Validators.pattern(validatorsService.ADDRESS_VALIDATOR)])),
            case_type: new FormControl(''),
            appointment_with: new FormControl(''),
        });

        this.getUsersList();
    }

    ngOnInit() 
    {

    }

    goBack()
    {
        this.navCtrl.navigateBack('home');
    }

    async showDisclaimerForm()
    {
        /*

        let modal = await this.modalCtrl.create({
            component: DisclaimerComponent
        });

        modal.onDidDismiss().then(result =>
        {
            console.log(result);
            this.modalBlurClass = '';
            if (result != undefined && result != null && result.data != undefined)
            {
                if (result.data.hasAgreed != undefined && result.data.hasAgreed == true)
                {
                    this.disclaimerAccepted = true;
                    this.submitForm();
                }
                else
                {
                    this.disclaimerAccepted = false;
                    this.presentToast(this.apiValue.DECLINED_DISCLAIMER_MESSAGE);
                }
            }
            else
            {
                this.disclaimerAccepted = false;
                this.presentToast(this.apiValue.DECLINED_DISCLAIMER_MESSAGE);
            }

        });

        await modal.present();
        this.modalBlurClass ='blurBackground';

        */
    }

    async submitForm()
    {
        if (!this.disclaimerAccepted)
        {
            this.presentAlert(this.apiValue.DECLINED_DISCLAIMER_MESSAGE);
            return;
        }

        //We will submit form only if user has accecpted the disclaimer

        this.clickedSubmitted = true;

        const loader = await this.loadingCtrl.create({

            message: this.apiValue.CHECKING_IN_MESSAGE,
            duration: this.apiValue.REGULAR_LOADING_DURATION
        });

        let loadingSuccessful = false;//To know whether loading timeout occcured

        await loader.present();

        let body = new FormData();
        body.set('client_type', this.checkinForm.controls.client_type.value);
        body.set('name', this.checkinForm.controls.name.value);
        body.set('contact', String(this.checkinForm.controls.contact.value).replace(/\D+/g,''));
        body.set('appointment_with', this.checkinForm.controls.appointment_with.value);
        body.set('case_no', this.checkinForm.controls.alien_no.value); //Alien No. and Case No. are same
        body.set('address', this.checkinForm.controls.address.value);
        body.set('email_id', this.checkinForm.controls.email.value);
        body.set('case_type', this.checkinForm.controls.case_type.value);

        this.http.post(this.apiValue.baseAPiUrl + 'checkin.php', body)
            .subscribe(response =>
            {
                loadingSuccessful = true;
                console.log(response);
                loader.dismiss();

                if (response)
                {
                    if ('code' in response) //Server will respond with a success or failure code and message
                    {
                        if (response['code'] != 200)
                        {
                            this.presentAlert(response['message']);
                        }
                        else
                        {
                            //Success
                            this.clickedSubmitted = false;
                            this.presentToast('Successfully Checked-In');
                            this.navCtrl.navigateForward('successful');
                          
                        }
                    }
                    else
                    {
                        this.presentAlert('Failure! Server respond with an error.');
                    }
                }
                else
                {
                    this.presentAlert('Failure! Server respond with an error.');
                }

            }, error =>
                {
                    console.log(error);
                    loadingSuccessful = true;
                    loader.dismiss();
                    this.presentAlert('Failure! Server respond with an error.');
            });
    }

    fetchClientDetails()
    {
        if (!this.checkinForm.controls.contact.valid)
        {
            return; //Contact is invalid, we will not fetch data
        }
        let contact = String(this.checkinForm.controls.contact.value).replace(/\D+/g, ''); //Replace all non digits with ''
        let body = new FormData();
        body.set('contact', contact);
        this.http.post(this.apiValue.baseAPiUrl + 'get_client_details.php', body)
            .subscribe(response =>
            {
                console.log(response);
                if (response)
                {
                    //We have the response
                    if ('code' in response)
                    {
                        //There is no data but error message along with error code

                    }
                    else
                    {
                        //We have got the data
                        let clientDetails: any = response;
                        this.autofillClientDetails(clientDetails);
                    }
                }
            }, error =>
                {
                    console.log(error);
            });
    }

    clientTypeChange()
    {
        //User has changed the client type. We will change the required field respectively

        console.log('---Client Type Changed---');

        if (this.checkinForm.controls.client_type.value != undefined && String(this.checkinForm.controls.client_type.value) == 'Existing Client')
        {
            //If existing 

            this.isExistingClient = true;
            console.log('Existing');
            //we need appointment with field
            this.checkinForm.controls.appointment_with.setValidators(Validators.required);

            //Rest are non-mandatory
           
            this.checkinForm.controls.case_type.setValidators(null);
            this.checkinForm.controls.address.setValidators(null);

        }
        else
        {
            //New User

            this.isExistingClient = false;
            console.log(this.checkinForm.controls.client_type.value);
            //we need case type field
            this.checkinForm.controls.case_type.setValidators(Validators.required);
            this.checkinForm.controls.address.setValidators([Validators.required,Validators.pattern(this.validatorsService.ADDRESS_VALIDATOR)]);

            //Rest are non-mandatory
            this.checkinForm.controls.appointment_with.setValidators(null);




        }

        //update validity
        this.checkinForm.controls.appointment_with.updateValueAndValidity();
        this.checkinForm.controls.case_type.updateValueAndValidity();
        this.checkinForm.controls.address.updateValueAndValidity();

        
    }

    disclaimerMarkChanged()
    {
        
        if (!this.disclaimerAccepted)
        {
            this.presentAlert(this.apiValue.DECLINED_DISCLAIMER_MESSAGE);
            return;
        }
        else
        {
            this.errorMessage = '';
        }
    }

    autofillClientDetails(clientData: ClientDetails)
    {
        if (clientData != undefined && clientData != null)
        {
            //User details are found
            this.checkinForm.controls.client_type.setValue('Existing Client'); //Set client type to existing
            this.clientTypeChange(); //Change the validators

            //Set the values
            this.checkinForm.controls.name.setValue(clientData.name);
            this.checkinForm.controls.alien_no.setValue(clientData.case_no);
            this.checkinForm.controls.email.setValue(clientData.email_id);
            this.checkinForm.controls.contact.setValue(this.maskContact(clientData.contact_no));
            this.checkinForm.controls.address.setValue(clientData.address);
            this.checkinForm.controls.case_type.setValue(clientData.case_type);
            this.checkinForm.controls.appointment_with.setValue(clientData.user_id);

            this.checkinForm.updateValueAndValidity();
        }
    }

    maskContact(contact:string)
    {
        let maskedContact = '';
        for (let i = 0; i < contact.length; i++)
        {
            if (i == 3 || i == 6)
            {
                maskedContact += '-'+contact.charAt(i);
            }
            else
            {
                maskedContact += contact.charAt(i);
            }
            
        }
        return maskedContact;
    }

    async presentToast(msg,duration=3000)
    {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: duration
        });

        await toast.present();
    }

    async getUsersList()
    {
        const loader = await this.loadingCtrl.create({
            message: this.apiValue.REGULAR_LOADING_MESSAGE,
            duration: this.apiValue.REGULAR_LOADING_DURATION
        });

        let loadingSuccessful = false; //To know whether loading timeout occured or not

        await loader.present();

        this.http.get(this.apiValue.baseAPiUrl + 'get_users_list.php')
            .subscribe(response =>
            {
                console.log(response);
                loadingSuccessful = true;

                if (response)
                {
                    try
                    {
                        let result = response;

                        if ('code' in result)
                        {
                            //Error
                            this.presentAlert(result['message']);
                        }
                        else
                        {
                            //Success
                            this.userList = result;
                        }
                    }
                    catch (err)
                    {
                        console.log(err);
                        this.presentAlert('Falied To Load Data');
                    }
                }
                else
                {
                    this.presentAlert('Falied To Load Data');
                }

                loader.dismiss();

            }, error =>
                {
                    this.presentAlert('Falied To Get Data From Server');

                });

        loader.onDidDismiss().then(() =>
        {
            if (!loadingSuccessful)
            {
                this.presentAlert('Timeout! Server Did Not Respond');
            }
        });

    }

    async presentAlert(msg)
    {
        this.errorMessage = msg;
        const alert = await this.alertCtrl.create({

            header: 'Attention!',
            message: msg,
            buttons: [{

                text: 'Dismiss',
                role:'Cancel'
            }]

        });

        await alert.present();
    }

}
