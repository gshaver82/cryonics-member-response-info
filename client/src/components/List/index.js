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
  firebaseAuthID,
}) {
  return (
    <li className="list-group-item">
      <div>
        <div>
          <div >
            <h6>name: {name}</h6>

            <h6>firebaseAuthID: {firebaseAuthID}</h6>
          </div>
        </div>
      </div>
    </li>
  );
}