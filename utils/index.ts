export const fallBackName = (name: string) => {
  const newName = name.split(" ");
  return newName.length > 2
    ? newName[0].charAt(0) + newName[1].charAt(0)
    : newName[0].charAt(0);
};
