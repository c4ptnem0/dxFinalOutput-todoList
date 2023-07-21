export const UpdateLocalStorage = (data) => {
  localStorage.setItem("todoListItems", JSON.stringify(data));
};
