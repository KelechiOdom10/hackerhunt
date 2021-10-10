/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import CustomLink from "../utils/CustomLink";

export default function SignupForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = values;
  const [show, setShow] = useState(false);

  const toggle = e => {
    e.preventDefault();
    setShow(!show);
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <VStack spacing={6}>
        <Text>Sign up to Hacker Hunt!</Text>
        <FormControl id="username" isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>Username</FormLabel>
          <Input
            variant="primary"
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter your username"
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>
            Email address
          </FormLabel>
          <Input
            variant="primary"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleChange}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              variant="primary"
              pr="4.5rem"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
              fontSize={{ base: "sm", md: "md" }}
            />
            <InputRightElement width="3rem" mr={1}>
              <IconButton
                h="1.75rem"
                onClick={toggle}
                colorScheme="gray"
                aria-label="Toggle Password"
                icon={show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button variant="primary" type="submit" w="full">
          Sign Up
        </Button>{" "}
      </VStack>
      <Box my={2}>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color={useColorModeValue("brand.400", "brand.200")}
        >
          Already have an account?{" "}
          <CustomLink underline fontWeight="bold" href="/signin">
            Sign In
          </CustomLink>
        </Text>
      </Box>
    </form>
  );
}
