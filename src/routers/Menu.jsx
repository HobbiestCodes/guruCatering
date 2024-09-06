import React from "react";
import MenuItems from "../components/ui/menu";
import { useParams } from "react-router-dom";

function Menu() {
  const { category } = useParams();

  return (
    <div>
      <MenuItems category={category} />
    </div>
  );
}

export default Menu;
