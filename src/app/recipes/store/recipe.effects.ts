import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import * as RecipeActions from './recipe.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import * as fromRecipe from './recipe.reducers';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(RecipeActions.FETCH_RECIPES)
        .pipe(
            switchMap((action: RecipeActions.FetchRecipes) => {
                return this.httpClient.get<Recipe[]>('https://ng-recipe-book-ad41b.firebaseio.com/recipes.json', {
                    observe: 'body',
                    responseType: 'json'
                });
            }),
            map((recipes) => {
                console.log(recipes);
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            })
        );

    @Effect({dispatch: false})
    recipeStore = this.actions$
        .ofType(RecipeActions.STORE_RECIPES)
        .pipe(
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action, state]) => {
                const request = new HttpRequest('PUT', 'https://ng-recipe-book-ad41b.firebaseio.com/recipes.json',
                    state.recipes, { reportProgress: true});
                return this.httpClient.request(request);
            })
        );

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromRecipe.FeatureState>
        ) {}
}
