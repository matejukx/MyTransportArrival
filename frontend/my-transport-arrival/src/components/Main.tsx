import {
    Input,
    Container,
    Avatar,
    Stack,
    Text,
    Button,
    AvatarBadge,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from "@chakra-ui/react";
import AvatarComponent from "./AvatarComponent";
import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import NotLoggedModal from "./NotLoggedModal";
import DelayDashboard from "./DelayDashboard";
import AddStops from "./AddStops";

const Main = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   
    useEffect(() => {
        const isUserLoggedIn = UserService.isUserLoggedIn();
        setIsLoggedIn(isUserLoggedIn);
      }, []);
   
    return (
        <Container centerContent alignSelf="center">
            {!isLoggedIn && <NotLoggedModal />}
            {isLoggedIn && (
                <>
                <Tabs boxSizing="border-box" width="200%">
                    <TabList>
                        <Tab onClick={() => {window.location.reload()}}>My stops</Tab>
                        <Tab>
                            Add stops
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <AvatarComponent />
                            <DelayDashboard />
                        </TabPanel>
                        <TabPanel>
                            <AvatarComponent />
                            <AddStops/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                </>
            )}
        </Container>


    );
};

export default Main;
