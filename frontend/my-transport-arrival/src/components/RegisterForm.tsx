import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Container, Heading } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { useContext, useState } from "react";
import { UserService } from "../services/UserService";
import { User, UserLoginDto } from "../entities/User";
import { useToast } from "@chakra-ui/react";
import { UserServiceContext } from "../App";

const RegisterForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const userService = useContext(UserServiceContext);

    const handleClick = () => setShow(!show);

    const toast = useToast();

    const handleRegister = async () => {
        const result = await UserService.register({ login, password });
        if (result === true) {
            userService.login({ login, password });
            window.location.reload();
            toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                position: "top",
                duration: 9000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Account creation failed.",
                description: "We couldnt create your account.",
                status: "error",
                position: "top",
                duration: 9000,
                isClosable: true,
            });
        }
    };

    return (
        <Container alignSelf="center" centerContent>
            
            <Input
                margin="2"
                placeholder="Login"
                value={login}
                onChange={(event) => setLogin(event.target.value)}
            />
            <InputGroup size="md" margin={2}>
                <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Button onClick={handleRegister}>Register</Button>
        </Container>
    );
};

export default RegisterForm;
