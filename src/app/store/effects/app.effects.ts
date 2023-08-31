import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TranslateService } from "@ngx-translate/core";
import { tap } from "rxjs";
import { AppActionsType } from "../actions/app.actions";

@Injectable()
export class AppEffects {

    switchLanguage$ = createEffect(
        () => this.actions$.pipe(
            ofType(AppActionsType.languageChoice),
            tap(({language}) => {
                this.translate.use(language);
                localStorage.setItem('language', language)
            }),
        ),
        {dispatch: false}
    )
    
    constructor(
        private actions$: Actions,
        private translate: TranslateService
    ){}
}