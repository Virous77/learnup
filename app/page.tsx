import { auth } from "../auth/auth";

const HomePage = async () => {
  const user = await auth();
  console.log(user);
  return <main>HomePage</main>;
};

export default HomePage;
