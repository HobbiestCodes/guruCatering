import React from "react";
import MenuItems from "../components/ui/menu";
import { useParams } from "react-router-dom";

function Menu() {
  const { category } = useParams();
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const currentVegFilter = queryParams.get("veg");

  // console.log(currentVegFilter);

  return (
    <div>
      <MenuItems category={category} isVeg={currentVegFilter} />
    </div>
  );
}

export default Menu;
