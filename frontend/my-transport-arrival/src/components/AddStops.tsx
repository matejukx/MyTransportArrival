import { useState, useEffect, memo, useContext } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
    Box,
    Container,
    Select,
    SimpleGrid,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Stop } from "../entities/Stop";
import { StopService } from "../services/StopService";
import { UserService } from "../services/UserService";
import { UserServiceContext } from "../App";

const AddStops = memo(() => {
    const [stopName, setStopName] = useState("");
    const [stops, setStops] = useState<Stop[]>([]);
    const [filteredStops, setFilteredStops] = useState<Stop[]>([]);
    const userService = useContext(UserServiceContext);
    const toast = useToast();
    useEffect(() => {
        console.log("fetching stops");
        StopService.getStops().then((stops) => {
            setStops(stops);
            setFilteredStops(stops.slice(0, 18));
        });
    }, []);

    const handleSearch = () => {
        const newFilteredStops = stops.filter(
            (stop: Stop) =>
                stop.stopName &&
                stop.stopName.toLowerCase().includes(stopName.toLowerCase())
        );
        setFilteredStops(newFilteredStops.slice(0, 18));
    };

    const handleStopSelection = (stop: Stop) => {
        userService.addStop(stop.stopId).then((result) => {
            if (result) {
                toast({
                    title: "Stop added",
                    description: "Your stop has been added.",
                    position: "top",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Error",
                    description: "We couldnot add your stop.",
                    position: "top",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
            }
        });
    };

    return (
        <Container alignSelf="center" centerContent minW="80%">
            <Box display="flex" alignItems="center" margin="10px">
                <FormControl margin="4px">
                    <Input
                        value={stopName}
                        placeholder="Search for a stop"
                        onChange={(event) => {
                            setStopName(event.target.value);
                            handleSearch();
                        }}
                    />
                </FormControl>
                <Button onClick={handleSearch}>Search</Button>
            </Box>
            <SimpleGrid columns={[1, 2, 3]} spacing={3} minW="80%">
            {filteredStops.map((stop) => (
                <Button
                    minW="100%"
                    margin="3px"
                    key={stop.stopId}
                    onClick={() => handleStopSelection(stop)}
                >
                    {stop.stopName} {stop.stopCode}
                </Button>
            ))}
             </SimpleGrid>
            <Text>Please search for a stop to see more results.</Text>
        </Container>
    );
});

export default AddStops;
