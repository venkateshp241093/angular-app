import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'Vegetable Salad',
            'This is a test',
            'https://upload.wikimedia.org/wikipedia/commons/b/b6/Vegetable_Salad.jpg',
            [
                new Ingredient('Cucumber', 2),
                new Ingredient('Tomatoes', 7)
            ]),
        new Recipe(
            'Nippat Masala',
            'This is a test',
            'http://mexicosobreruedas.mx/home/wp-content/uploads/2018/07/tacoas-al-pastor-700x390.jpg',
            [
                new Ingredient('Nippats', 6),
                new Ingredient('Onion', 2),
                new Ingredient('Tomatoes', 2)
            ])
      ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            };
        case RecipeActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case RecipeActions.UPDATE_RECIPE:
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case RecipeActions.DELETE_RECIPE:
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default:
            return state;
    }
}
