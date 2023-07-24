"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { db } from "../Firebase/FireConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const GlobalContext = createContext({});

function GlobalProvider({ children }) {
  const [inputDetails, setInputDetails] = useState("");
  const [category, setCategory] = useState("All");

  const [ShowList, setShowList] = useState([]);
  const AddTodo = async () => {
    if (inputDetails) {
      try {
        const docRef = await addDoc(collection(db, "Lista"), {
          Do: inputDetails,
          completed: false,
        });
        setShowList((Prev) => [
          ...Prev,
          { id: docRef.id, Do: inputDetails, completed: false },
        ]);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("El input esta vacio");
    }
  };
  const CompleteTask = async (event, item) => {
    const IsChecked = event.target.checked;
    try {
      await updateDoc(doc(db, "Lista", `${item.id}`), {
        completed: IsChecked,
      });
      setShowList((PrevList) =>
        PrevList.map((todoItem) =>
          todoItem.id === item.id
            ? { ...todoItem, completed: IsChecked }
            : todoItem
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteTask = async (item) => {
    try {
      await deleteDoc(doc(db, "Lista", `${item.id}`));
      setShowList((PrevLista) =>
        PrevLista.filter((TodoItem) => TodoItem.id !== item.id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteAll = async () => {
    const Filtrar = ShowList.filter((TodoItem) => TodoItem.completed === true);
    try {
      for (let index = 0; index < Filtrar.length; index++) {
        const element = Filtrar[index];
        await deleteDoc(doc(db, "Lista", `${element.id}`));
        console.log("element: ", element);
      }
      setShowList((PrevLista) =>
        PrevLista.filter((TodoItem) => TodoItem.completed === false)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    const DataSnapshot = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Lista"));
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShowList(newData);
      } catch (error) {
        console.log(error);
      }
    };
    DataSnapshot();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        AddTodo,
        inputDetails,
        category,
        setCategory,
        setInputDetails,
        ShowList,
        CompleteTask,
        DeleteTask,
        DeleteAll,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalProvider;

export const UseGlobal = () => useContext(GlobalContext);
