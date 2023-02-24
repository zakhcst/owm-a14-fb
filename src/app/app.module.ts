import { NgModule, ErrorHandler } from '@angular/core';

import { RequiredModules } from './modules/required.module';
import { AdditionalModules } from './modules/additional.module';

import { AppComponent } from './app.component';
import { AppSnackBarInnerComponent } from './components/app-snack-bar-inner/app-snack-bar-inner.component';
import { AppRoutingModule } from './modules/routing.module';
import { AppErrorHandlerService } from './services/app-error-handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './modules/shared.module';
import { InitModules } from './modules/init.module';

@NgModule({
    declarations: [AppComponent, AppSnackBarInnerComponent],
    imports: [
        InitModules,
        RequiredModules,
        SharedModule,
        AdditionalModules,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    exports: [
        RequiredModules,
        SharedModule,
        AdditionalModules,
    ],
    providers: [
        { provide: ErrorHandler, useClass: AppErrorHandlerService },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
