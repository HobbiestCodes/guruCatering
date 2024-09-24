import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";

function Selection() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/catogery");
      if (response.status === 200) {
        setCategories(response.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="selection">
      <div className="portions upper">
        <div className="box">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => (window.location = `/menu/${category.name}`)}
              // to={`/menu/${category.name}`}
              className="category-link"
            >
              <div key={index} className="imgContainer">
                <img
                  src="https://picsum.photos/1080/1920?random=1"
                  alt={category.name}
                />
                <div className="popUp">
                  <h1>{category.name}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Selection;
