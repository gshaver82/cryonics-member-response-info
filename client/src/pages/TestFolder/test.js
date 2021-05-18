import React, { useState } from "react";
import API from "../../utils/API";
import { UlList, ListItem, } from "../../components/List/index";


function Test() {
    const [recipes, setRecipes] = useState([]);

    let [newRecipe, setNewRecipe] = useState([
        {
            firebaseAuthID: "default firebaseAuthID",
            name: "default Name",
        },
    ]);

    const recipeSubmit = event => {
        event.preventDefault();
        API.getAllRecipes()
            .then(res => setRecipes(res.data))
            .catch(err => console.log(err));
    };

    const createRecipeSubmit = event => {
        event.preventDefault();
        console.log('creating dummy object');
        function setDummyObject() {
            setNewRecipe({
                userID: "usernumber1",
                name: "asdfasdfasdf pancakes",
            })
        };
        setDummyObject();
        API.createRecipe(newRecipe)
            .catch(err => console.log(err));
    };

    const createRecipeUpdateSubmit = event => {
        event.preventDefault();
        API.updateRecipe()
            .then(res => setNewRecipe(res.data))
            .catch(err => console.log(err));
    };
    const deleteRecipe = event => {
        event.preventDefault();
        // manually put the recipe id here to verify this works 
        API.deleteRecipe("5f5550b4ea82aa49a4f93a84")
            .catch(err => console.log(err));
    };
    const oneRecipe = event => {
        event.preventDefault();
        API.getOneRecipe("5f5550b4ea82aa49a4f93a84")
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    };
    return (
        <div>
            <h1>testing page</h1>

            <button onClick={deleteRecipe} className="btn btn-info">
                {" "}deleteRecipe Test{" "}
            </button>

            <button onClick={createRecipeSubmit} className="btn btn-info">
                {" "}create Test{" "}
            </button>

            <button onClick={createRecipeUpdateSubmit} className="btn btn-info">
                {" "}Update Test{" "}
            </button>

            <button onClick={oneRecipe} className="btn btn-info">
                {" "}One recipe{" "}
            </button>
            <button onClick={recipeSubmit} className="btn btn-info">
                {" "}RecipeList{" "}
            </button>
            <UlList>
                {recipes.map(recipe => {
                    return (<div>
                        <ListItem
                            key={recipe._id}
                            name={recipe.name}
                            description={recipe.description}
                            imageUrls={recipe.imageUrls}
                            category={recipe.category}
                            title={recipe.actions[0].title}
                            text={recipe.actions[0].text}
                        />
                    </div>
                    );
                })}

            </UlList>
        </div>
    );
}
export default Test;