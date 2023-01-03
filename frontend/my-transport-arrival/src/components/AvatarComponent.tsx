import {
    Avatar,
    Stack,
    AvatarBadge,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { UserServiceContext } from "../App";

const AvatarComponent = () => {
    const [mainUser, setMainUser] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userService = useContext(UserServiceContext);
    
    useEffect(() => {
        const login = localStorage.getItem("mainUser");
        if (login) {
            setMainUser(login);
        }
    }, []);

    function handleLogout(event: any): void {
        userService.logout();
        window.location.reload();
        onClose();
    }

    return (
        <Stack direction="row" position="absolute" top={0} right={0}>
            <Avatar name={mainUser} margin="5" onClick={onOpen} style={{cursor: 'pointer'}}>
                <AvatarBadge
                    boxSize="1.25em"
                    bg={mainUser === null ? "red.500" : "green.500"}
                />
            </Avatar>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Currently logged as: {mainUser}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Do you want to log out?</ModalBody>
                    <ModalFooter justifyContent="center">
                        <Button mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="ghost" onClick={handleLogout}>
                            Log Out
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    );
};

export default AvatarComponent;
