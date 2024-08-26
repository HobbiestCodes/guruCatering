import React, { Suspense, useEffect, useState } from "react";
import "./styles.scss";
import { RiUserSearchLine, RiAdminLine } from "react-icons/ri";
import { IoFastFoodOutline, IoLogOutOutline, IoCloseOutline } from "react-icons/io5";
import { readData } from "../../funcs/useFetch";

import {
  FaRegEdit,
  FaRegTrashAlt,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";

function Dashboard() {
  const tabs = [
    { title: "Admins", icon: RiAdminLine },
    { title: "Users", icon: RiUserSearchLine },
    { title: "Foods", icon: IoFastFoodOutline },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].title);
  const { data = [], isLoading, error, reFetch } = readData(activeTab);

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [isVeg, setIsVeg] = useState(false);
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [key, setKey] = useState('');

  const [user, setUser] = useState(false);
  const [role, setRole] = useState("");
  const [create, setCreate] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);

  const keys =
    data && data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "_id" && key !== "__v")
      : [];

  useEffect(() => {
    reFetch();
    if (activeTab === "Users" || activeTab === "Admins") {
      setUser(true);
      data[0]?.role ? setRole(data[0].role) : "";
    }
  }, [activeTab]);

  const handleEdit = async (action, id) => {
    let url = "http://localhost:8080/search";
    let METHOD = "POST";
    try {
      setLoading(true);
      if (action === "delete") {
        url = `http://localhost:8080/delete`;
      }
      if (action === "edit") {
        url = `http://localhost:8080/search`;
      }
      if (action === "update") {
        url = `http://localhost:8080/update`;
        METHOD = "PUT";
      }

      const response = await axios.request({
        method: METHOD,
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          endpoint: activeTab,
          id: id,
          data: {
            name: name,
            price: price,
            rating: rating,
            isVeg: isVeg,
            image: image,
            description: description,
          },
        },
      });

      setName(response.data.name);
      setPrice(response.data.price);
      setRating(response.data.rating);
      setIsVeg(response.data.isVeg);
      setImage(response.data.image);
      setDescription(response.data.description);
      console.log(response.data);

      setLoading(false);
      // setVisible(true)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/update`, {
        id: id,
        name: name,
        description: description,
        price: price,
        image: image,
        rating: rating,
        isVeg: isVeg,
      });
      console.log("Item updated:", response.data);
      setVisible(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleUserUpdate = async (id) => {
    const response = await axios.put(`http://localhost:8080/users/update`, {
      id: id,
      role: role,
    });
    console.log("User updated:", response.data);
    setVisible(false);
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/createFood`, {
        name: name,
        description: description,
        price: price,
        image: image,
        rating: rating,
        isVeg: isVeg,
      });
      console.log("Item created:", response.data);
      setVisible(false);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  async function UploadImage(e) {
    const files = e.target.files;
    const file = files[0];

    if (file && file.type.startsWith("image/")) {
      setKey(file);
    } else {
      setImage("couldn't upload, please upload image!");
    }
  }

  async function PostImage(string) {
    let url = `https://api.imgbb.com/1/upload?key=205b43fdaf7fa938b57fa8ab143d8685`;
    const data = new FormData();
    data.append("image", string);
    try {
      const response = await axios.post(url, data);
      if (response.status !== 200) {
        console.log("error");
        return;
      }
      console.log(response.data.data.url);
      setImage(response.data.data.url);
    } catch {
      console.log("error");
    }
  }

  if (key) {
    PostImage(key);
  }

  return (
    <div className="container">
      {visible || create || update ? (
        <>
          <div className="dark"></div>
          {create || (update && activeTab === "Foods") ? (
            <div className="visible">
              <h1>
                {create ? "Create Data" : "Update Data"}
                <IoCloseOutline
                  className="icons"
                  onClick={() => {
                    setCreate(false), setUpdate(false), setVisible(false);
                    setName(""),
                      setPrice(""),
                      setRating(""),
                      setIsVeg(false),
                      setDescription("");
                  }}
                />
              </h1>
              <form className="form">
                <input
                  type="text"
                  placeholder="Food name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type="number"
                  max={5}
                  min={0}
                  placeholder="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                
                <select
                  name="isVeg"
                  value={isVeg}
                  onChange={(e) => setIsVeg(e.target.value)}
                >
                  <option disabled>Veg ?</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
                {image !== "" ? (
                  <div className="imgCont">
                    {create ? (
                      <h3>Image uploaded Successfully!!</h3>
                    ) : (
                      <input
                        onChange={UploadImage}
                        style={{ width: "60%", height: "6rem" }}
                        accept="image/*"
                        type="file"
                      />
                    )}
                    <img src={image} alt="uploaded" className="uploadedImage" />
                  </div>
                ) : (
                  <input onChange={UploadImage} accept="image/*" type="file" />
                )}
                <textarea
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                  {create && (
                    <button style={{ cursor: "pointer" }} onClick={handleCreate}>
                  Create Data
                </button>
                )}
                {update && (
                  <button style={{ cursor: "pointer" }} onClick={() => handleUpdate(id)}>
                  Update Data
                </button>
                )}
              </form>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      {activeTab === "Foods" ? (
        <div className="add">
          <div className="logo"></div>
          <div className="btns">
            <button
              className="btn"
              onClick={() => {
                setCreate(true);
              }}
            >
              Add Food +
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="child">
        <div className="left">
          <div className="top">
            <h1>Dashboard</h1>
            <ul>
              {tabs.map((items) => (
                <li
                  key={items.title}
                  className={activeTab === items.title ? "active" : ""}
                  onClick={() => setActiveTab(items.title)}
                >
                  <items.icon /> {items.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom">
            <div className="logout">
              <button>
                <IoLogOutOutline style={{ transform: "rotate(180deg)" }} />{" "}
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="right">
          {isLoading ? (
            <div>Loading</div>
          ) : error ? (
            <div>Error</div>
          ) : data.length > 0 ? (
            <>
              <div className="header">
                <table cellPadding="0" cellSpacing="0" border="0">
                  <thead>
                    <tr>
                      {keys.map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                      <div className="empty"></div>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="content">
                {/* {visible ? create ?  <Create /> : "" : } */}
                <table cellPadding="0" cellSpacing="0" border="0">
                  <tbody>
                    {/* <Suspense fallback={<div>isLoading</div>}>  */}

                    {isLoading ? (
                      <tr>isLoading</tr>
                    ) : error ? (
                      <tr>Error</tr>
                    ) : data.length > 0 ? (
                      <>
                        {data.map((item, index) => (
                          <>
                            <tr>
                              {Object.keys(item)
                                .filter((key) => key !== "_id" && key !== "__v")
                                .map((key) => (
                                  <>
                                    <td key={key}>
                                      {
                                        <>
                                          {typeof item[key] === "string" &&
                                          item[key].startsWith("http") &&
                                          (item[key].includes(
                                            "googleusercontent"
                                          ) ||
                                            item[key].includes("i.ibb.co")) &&
                                          // item[key].includes("googleusercontent")
                                          item[key].slice(0, 50) ? (
                                            <img
                                              src={item[key]}
                                              alt={`Image ${index}`}
                                              style={{
                                                width: "35px",
                                                borderRadius: "50px",
                                                height: "auto",
                                              }}
                                            />
                                          ) : item[key] === true ? (
                                            "Yes"
                                          ) : item[key] === false ? (
                                            "No"
                                          ) : (
                                            item[key]
                                          )}
                                        </>
                                      }
                                    </td>
                                  </>
                                ))}
                              <div className="empty">
                                {loading ? (
                                  <FaSpinner className="spinner" />
                                ) : (
                                  <>
                                    <FaRegEdit
                                      className="edit"
                                      size={18}
                                      onClick={() => {
                                        {
                                          setVisible(true);
                                          setUpdate(true);
                                          update
                                            ? console.log("nalla")
                                            : handleEdit("edit", item._id),
                                            setId(item._id);
                                        }
                                      }}
                                    />
                                    <FaRegTrashAlt
                                      className="delete"
                                      size={18}
                                      onClick={() => {
                                        handleEdit("delete", item._id);
                                      }}
                                    />
                                    {visible &&
                                    user &&
                                    activeTab !== "Foods" ? (
                                      <div className="visible userEd">
                                        <h1>
                                          Edit Data{" "}
                                          <IoCloseOutline
                                            className="icons"
                                            onClick={() => {
                                              setVisible(false),
                                                setUpdate(false);
                                            }}
                                          />
                                        </h1>
                                        <form className="form">
                                          <select
                                            value={role}
                                            onChange={(e) =>
                                              setRole(e.target.value)
                                            }
                                          >
                                            <option value={"admin"}>
                                              admin
                                            </option>
                                            <option value={"user"}>user</option>
                                          </select>
                                          <button
                                            onClick={() => {
                                              handleUserUpdate(item._id);
                                            }}
                                          >
                                            Update
                                          </button>
                                        </form>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )}
                              </div>
                            </tr>
                          </>
                        ))}
                      </>
                    ) : (
                      "No Data"
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            "No Data"
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;