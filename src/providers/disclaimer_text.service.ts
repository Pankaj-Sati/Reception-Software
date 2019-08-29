/*
 * This service provides disclaimer/ T&C text in multiple languages
 */

import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class DisclaimerTextService
{
    public readonly disclaimerTranslations: Array<{ language, text }> = [
        { language: 'English', text:'' }
    ];
}