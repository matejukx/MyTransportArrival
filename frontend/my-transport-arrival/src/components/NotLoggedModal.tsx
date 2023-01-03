import { useEffect, useState } from "react";
import { UserService } from "../services/UserService";
import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/modal";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { Flex, Stack } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import { Image } from '@chakra-ui/react'

const NotLoggedModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isRegisterOpen,
        onOpen: onRegisterOpen,
        onClose: onRegisterClose,
    } = useDisclosure();

    return (
        <>
            <Flex align="center" justify="center" height="100vh">
                <Stack spacing={3}>
                    <Image src="https://media.tenor.com/gMeXfCmIT2gAAAAC/run-chase.gif" />
                    <Heading>Please sign in to continue</Heading>
                    <Button onClick={onOpen}>Sign In</Button>
                    <Button onClick={onRegisterOpen}>Create new account</Button>
                </Stack>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Sign In</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginForm />
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={isRegisterOpen} onClose={onRegisterClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create an Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <RegisterForm />
                    </ModalBody>
                    
                </ModalContent>
            </Modal>
        </>
    );
};

export default NotLoggedModal;
