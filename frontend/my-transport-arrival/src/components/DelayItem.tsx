import { useContext, useEffect, useState } from "react";
import { DelayService } from "../services/DelayService";
import { Stop } from "../entities/Stop";
import { UserService } from "../services/UserService";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/card";
import { SmallCloseIcon } from '@chakra-ui/icons'
import {
    Box,
    Heading,
    List,
    ListItem,
    Stack,
    StackDivider,
    Text,
    useToast,
} from "@chakra-ui/react";
import { CircularProgress } from "@chakra-ui/progress";
import { Delay } from "../entities/Delay";
import { IconButton } from "@chakra-ui/react";
import { UserServiceContext } from "../App";

export interface DelayItemProps {
    stop: Stop;
}

const DelayItem = (props: DelayItemProps) => {
    const stop = props.stop;
    const [delays, setDelays] = useState<Delay[]>([]);
    const toast = useToast();
    const userService = useContext(UserServiceContext);
    
    useEffect(() => {
        DelayService.getDelays(stop.stopId).then((delays) =>
        setDelays(delays)
    );
        const interval = setInterval(() => {
            DelayService.getDelays(stop.stopId).then((delays) =>
                setDelays(delays)
            );
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleRemoveStop = () => {
        userService.removeStop(stop.stopId).then((result) => {
        if (result){
            window.location.reload();
        }
        toast({
            title: "Error",
            description: "We couldnt remove your stop.",
            position: "top",
            status: "error",
            duration: 9000,
            isClosable: true,
        });
    });
    };

    const getDelayText = (delay: Delay) => {
        if (delay.delayInSeconds < 0 ){
            return `Arriving ${Math.abs(delay.delayInSeconds)} seconds ahead of schedule!`;
        }
        return `Delayed by ${delay.delayInSeconds} seconds`;
    };


    return (
        <Card
            variant="elevated"
            border="1px"
            borderColor="gray.200"
            rounded="lg"
            minW="200px"
            minH="100px"
        >
            <IconButton
                aria-label="Close"
                icon={<SmallCloseIcon/>}
                size="xs"
                position="absolute"
                top="4px"
                right="4px"
                onClick={() => {handleRemoveStop()}}
            />
            <CardHeader textAlign="center" textTransform="uppercase" margin="4px">
                {stop.stopName} {stop.stopCode}
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                    {delays.map((delay) => (
                        <Box>
                            <Heading size="xs" textTransform="uppercase">
                                Line {delay.routeId} to: {delay.headsign}
                            </Heading>
                            <Text pt="2" fontSize="sm">
                                Theoretical arrival time: {delay.theoreticalTime}
                            </Text>
                            <Text pt="2" fontSize="sm">
                                Arriving at {delay.estimatedTime}
                            </Text>
                            <Text pt="2" fontSize="sm">
                               {getDelayText(delay)}
                            </Text>
                        </Box>
                    ))}
                </Stack>
            </CardBody>
        </Card>
    );
};




export default DelayItem;
