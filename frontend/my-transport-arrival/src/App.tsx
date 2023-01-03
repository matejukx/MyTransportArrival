import Main from "./components/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { UserService } from "./services/UserService";
import { createContext } from "react";

const userService = new UserService();
export const UserServiceContext = createContext(userService);
function App() {

  return (
    <UserServiceContext.Provider value={userService}>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    </UserServiceContext.Provider>
  );
}

export default App;
