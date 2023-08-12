export const Logout = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
      method: "get",
      credentials: "include",
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
