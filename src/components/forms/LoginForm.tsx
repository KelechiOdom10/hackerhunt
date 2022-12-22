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
  FormHelperText,
  useColorModeValue,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import {
  useLoginMutation,
  LoginInput,
  MeQuery,
  MeDocument,
} from "~/apollo/generated/graphql";
import { setTokenCookie } from "server/utils/auth-cookies";
import CustomLink from "../utils/CustomLink";
import { formatError } from "~/utils/errorUtils";

export default function LoginForm() {
  const client = useApolloClient();
  const [login] = useLoginMutation();
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();

  const onSubmit = async (input: LoginInput) => {
    try {
      await client.resetStore();
      const { data } = await login({ variables: { input } });
      if (data?.login.token) {
        setTokenCookie(data.login.token);
        client.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: data.login.user },
        });
        toast({
          status: "success",
          description: "Successfully logged in!",
          position: "top-right",
          isClosable: true,
          duration: 4000,
        });
      }
    } catch (error) {
      const formattedError = formatError(error);
      toast({
        description: formattedError.message,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    }
  };

  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <VStack spacing={6}>
        <Text>Welcome Back!</Text>
        <FormControl id="email" isRequired isInvalid={!!errors?.email?.message}>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>
            Email address
          </FormLabel>
          <Input
            variant="primary"
            type="email"
            placeholder="Enter your email address"
            fontSize={{ base: "sm", md: "md" }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          <FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
            {errors?.email && errors?.email?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          id="password"
          isRequired
          isInvalid={!!errors?.password?.message}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              variant="primary"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              fontSize={{ base: "sm", md: "md" }}
              {...register("password", {
                required: "Password is required",
              })}
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
          <FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
            {errors?.password && errors.password.message}
          </FormErrorMessage>
          <FormHelperText textAlign="right">
            <CustomLink underline href="/forgotpassword">
              Forgot password?
            </CustomLink>
          </FormHelperText>
        </FormControl>
        <Button
          variant="primary"
          type="submit"
          w="full"
          isLoading={isSubmitting}
          isDisabled={!!errors.email || !!errors.password}
        >
          Sign In
        </Button>{" "}
      </VStack>
      <Box my={2}>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          color={useColorModeValue("gray.600", "gray.400")}
        >
          Don't have an account?{" "}
          <CustomLink underline fontWeight="bold" href="/signup">
            Sign Up
          </CustomLink>
        </Text>
      </Box>
    </form>
  );
}
