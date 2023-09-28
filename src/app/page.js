import { ApiProvider } from "./services/api";
import UserPanel from "./components/UserPanel/UserPanel";
import UserComponent from "./components/UserList/UserList";

export default function Home() {
  return (
    <main>
      <ApiProvider>
        <UserPanel></UserPanel>
        <UserComponent></UserComponent>
      </ApiProvider>
      <></>
    </main>
  );
}
