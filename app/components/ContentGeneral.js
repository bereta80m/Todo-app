"use client";
import React, { useEffect, useState } from "react";
import { UseGlobal } from "../context/GlobalContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function ContentGeneral() {
  const {
    AddTodo,
    inputDetails,
    setInputDetails,
    ShowList,
    CompleteTask,
    DeleteTask,
    category,
    DeleteAll
  } = UseGlobal();
  const [myTodos, setMyTodos] = useState([]);

  useEffect(() => {
    const Filtros = () => {
      if (category === "All") {
        return ShowList;
      } else if (category === "Active") {
        const CasosActivos = ShowList.filter((item) => item.completed !== true);
        return CasosActivos;
      } else if (category === "Completed") {
        const CasosResolved = ShowList.filter(
          (item) => item.completed === true
        );
        return CasosResolved;
      }
    };
    const Datos = Filtros();
    setMyTodos(Datos);
  }, [category, ShowList]);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="grid lg:w-1/2 md:w-1/2 sm:w-4/5 xs:w-10/12 xxs:w-96 relative ">
        <div className="flex items-center w-full gap-5">
          <div className="flex items-center border-black/50 justify-center border h-14 w-full rounded-lg">
            <input
              text="text"
              className="flex items-center w-full h-10 mx-2 outline-none border-none "
              onChange={(e) => setInputDetails(e.target.value)}
              value={inputDetails}
              placeholder="Add Details"
            />
          </div>
          <button
            className="h-14 px-10 bg-[#2f80ed] text-md rounded-lg text-white "
            onClick={() => AddTodo()}
          >
            Add
          </button>
        </div>

        <div className="w-full h-80 overflow-auto ">
          {myTodos.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between px-2 items-center gap-5 mt-5"
              >
                <div className="flex items-center gap-5 truncate">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="cursor-pointer"
                    checked={item.completed}
                    onChange={(e) => CompleteTask(e, item)}
                  />
                  <p
                    className={`text-md font-semibold font-sans ${
                      item.completed ? "line-through" : ""
                    }`}
                  >
                    {item.Do}
                  </p>
                </div>
                <div className="">
                  {item.completed && (
                    <DeleteOutlineIcon className="cursor-pointer" onClick={()=>DeleteTask(item)}/>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex lg:w-1/2 md:w-1/2 sm:w-4/5 xs:w-10/12 xxs:w-96   relative justify-center ">
        <div className="flex w-full justify-end pt-5 ">
          {category !== "Completed" || myTodos.length < 1 ? ("") : (
            <button className="bg-[#eb5757] py-3 px-3 bottom-0  rounded-lg right-0" onClick={()=>DeleteAll()}>
              <DeleteOutlineIcon />
              delete all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentGeneral;
