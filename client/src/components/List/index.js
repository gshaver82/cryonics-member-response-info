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
  _id,
}) {
  return (
    <li className="list-group-item" key={_id}>
      name: {name}
      {/* _id: {_id} */}
      firebaseAuthID: {firebaseAuthID}
    </li>
  );
}