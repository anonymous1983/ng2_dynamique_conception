// app/atexo/common/components/atexo-spinner.component.ts
/**
 *
 * @name atexo-spinner.component.ts
 *
 */

import {Component, View} from 'angular2/core';

@Component({
    selector: 'atexo-spinner'
})

@View({
    template: `
                <div class="atexo-spinner center">
                    <div class="rect1"></div>
                    <div class="rect2"></div>
                    <div class="rect3"></div>
                    <div class="rect4"></div>
                    <div class="rect5"></div>
                </div>
            `,
    styles: [`
            .atexo-spinner {
              width: 25px;
              height: 20px;
              text-align: center;
              font-size: 5px;
              -moz-transition-duration: 1s;
              -webkit-transition-duration: 1s;
              -o-transition-duration: 1s;
              transition-duration: 1s;
            }

            .atexo-spinner.center{
               margin: 0 auto;
            }

            .hide-atexo-spinner .atexo-spinner,
            .atexo-spinner:hover{
                opacity: 0;
            }

            .atexo-spinner > div {
              background-color: #BBDEFB;
              height: 100%;
              width: 3px;
              display: inline-block;

              -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
              animation: sk-stretchdelay 1.2s infinite ease-in-out;
            }

            .atexo-spinner .rect2 {
              -webkit-animation-delay: -1.1s;
              animation-delay: -1.1s;
              background-color: #64B5F6;
            }

            .atexo-spinner .rect3 {
              -webkit-animation-delay: -1.0s;
              animation-delay: -1.0s;
              background-color: #2196F3;
            }

            .atexo-spinner .rect4 {
              -webkit-animation-delay: -0.9s;
              animation-delay: -0.9s;
              background-color: #1976D2;
            }

            .atexo-spinner .rect5 {
              -webkit-animation-delay: -0.8s;
              animation-delay: -0.8s;
              background-color: #0D47A1;
            }

            @-webkit-keyframes sk-stretchdelay {
              0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
              20% { -webkit-transform: scaleY(1.0) }
            }

            @keyframes sk-stretchdelay {
              0%, 40%, 100% {
                transform: scaleY(0.4);
                -webkit-transform: scaleY(0.4);
              }  20% {
                transform: scaleY(1.0);
                -webkit-transform: scaleY(1.0);
              }
            }
    `]


})
export class AtexoSpinner {

    constructor() {
        return true;
    }

}

