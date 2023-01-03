import { useContext, useEffect, useState } from "react";
import { Stop } from "../entities/Stop";
import { UserService } from "../services/UserService";
import { Box, Flex, List, ListItem, SimpleGrid } from "@chakra-ui/react";
import DelayItem from "./DelayItem";
import { UserServiceContext } from "../App";

const DelayDashboard = () => {
    const [stops, setStops] = useState<Stop[]>([]);
    const userService = useContext(UserServiceContext);
    useEffect(() => {
        userService.getCurrentUserStops().then((stops) => setStops(stops));
    }, []);

    return (
        <Box p={4} border="1px" borderColor="gray.200" rounded="lg" minH="400px">
            <SimpleGrid columns={[1, 2, 3]} spacing={4}>
                {stops.map((stop) => (
                    <DelayItem stop={stop} />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default DelayDashboard;
