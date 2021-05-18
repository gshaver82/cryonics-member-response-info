import React from "react";

// Exporting both RecipeList and ListItem from this file

// RecipeList renders a bootstrap list item
export function UlList({ children }) {
  return (
    <ul >
      {children}
    </ul>
  );
}

// ListItem renders a bootstrap list item containing data from the recipe api call
export function ListItem({
  name,
  description,
  imageUrls,
  category,
  ingredientCategoryIconLink,
  title,
  text
}) {
  return (
    <li className="list-group-item">
      <div>
        <div>
          <div className="xs-8 sm-9">
            <h6>name</h6>
            <h1>{name}</h1>

            <h6>description</h6>
            <h1>{description}</h1>

            <h6>imageUrls</h6>
            <h1>{imageUrls}</h1>

            <h6>category</h6>
            <h1>{category}</h1>

            <h6>ingredientCategoryIconLink</h6>
            <h1>{ingredientCategoryIconLink}</h1>

            <h6>title</h6>
            <h1>{title}</h1>

            <h6>text</h6>
            <h1>{text}</h1>
          </div>
        </div>
      </div>
    </li>
  );
}