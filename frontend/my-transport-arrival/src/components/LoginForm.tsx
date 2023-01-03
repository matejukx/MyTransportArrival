import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Container, Heading } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { useState } from "react";
import { UserService } from "../services/UserService";
import { useToast } from "@chakra-ui/react";

const LoginForm = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    const toast = useToast();

    const handleLogin = async () => {
        const result = await UserService.login({ login, password });
        if (result === true) {
            UserService.login({ login, password });
            window.location.reload();
            toast({
                title: "Login successful.",
                description: "You're logged in!.",
                position: "top",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else {
            console.log("Login failed");
            toast({
                title: "Login failed.",
                description: "We couldnt log you in.",
                position: "top",
                status: "error",
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

            <Button onClick={handleLogin}>Log in</Button>
        </Container>
    );
};

export default LoginForm;
