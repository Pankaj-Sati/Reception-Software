/*
 * This class provides commonly shared values throughout the app. Like Api Url, error messages etc
 */

import { Injectable } from '@angular/core';
@Injectable({
    providedIn:'root'
})
export class ApiValuesService
{
    public readonly baseAPiUrl: string = 'http://dsdlawfirm.com/dsdreception/api_work/';

    //---------------------------Messages-------------------------//
    public readonly DECLINED_DISCLAIMER_MESSAGE = 'You need to accept the terms and conditions before checking-in';

    public readonly REGULAR_LOADING_MESSAGE = 'Loading...';
    public readonly CHECKING_IN_MESSAGE = 'Checking In...';
    public readonly REGULAR_LOADING_DURATION = 15000; //15 seconds
}