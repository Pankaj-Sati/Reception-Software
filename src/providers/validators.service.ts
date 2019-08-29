import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable({
    providedIn:'root'
})
export class ValidatorsService
{
    /*
     * This class contains validators that are used throughout the app.
     * It will be easy to change anyone if needed
     */

    public readonly NAME_VALIDATOR = /^$|^([a-zA-Z]{2}[a-zA-Z0-9-_'. ]{0,50})$/;
    public readonly EMAIL_VALIDATOR = Validators.email;
    public readonly CONTACT_VALIDATOR = /^(([0-9]{3})[-]([0-9]{3})[-]([0-9]{4}))$/;
    public readonly ADDRESS_VALIDATOR = /^$|^([a-zA-Z0-9]{1}.{0,150})$/;
    public readonly ALIEN_NO_VALIDATOR = /^$|^([a-zA-Z0-9]{2}.{0,30})$/;
}