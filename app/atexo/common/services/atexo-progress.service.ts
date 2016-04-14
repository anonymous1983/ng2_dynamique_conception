// app/common/services/atexo/atexo-progress.service.ts
/**
 *
 * @name atexo-progress.service.ts
 *
 */

import {Injectable} from 'angular2/core';

@Injectable()
export class Progress {
    static instance:Progress;
    static isCreating:Boolean = false;

    private nbrProgress:number = 0;

    constructor() {
        if (!Progress.isCreating) {
            throw new Error('[Progress] You can\'t call new in Singleton instances!');
        }
    }

    static getInstance() {
        if (Progress.instance == null) {
            Progress.isCreating = true;
            Progress.instance = new Progress();
            Progress.isCreating = false;
        }
        return Progress.instance;
    }

    getNbrProgress() {
        return this.nbrProgress;
    }

    showBackdrop() {
        return this.getNbrProgress();
    }

    incrementNbrProgress() {
        this.nbrProgress++;
    }

    decrementNbrProgress() {
        if (this.nbrProgress !== 0) {
            this.nbrProgress--;
        }
    }
}