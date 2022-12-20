/* eslint-disable @typescript-eslint/no-explicit-any */
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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSignupMutation, SignupInput } from "~/apollo/generated/graphql";
import CustomLink from "../utils/CustomLink";

export default function SignupForm() {
  const [signup] = useSignupMutation();
  const router = useRouter();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>();
  const onSubmit = async (input: SignupInput) => {
    try {
      const { data } = await signup({ variables: { input } });
      if (data?.signup.token) {
        toast({
          status: "success",
          description: "Successfully signed up!",
          position: "top-right",
          isClosable: true,
          duration: 4000,
        });
        router.replace("/signin");
      }
    } catch (error: any) {
      toast({
        description: error.message,
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
        <Text>Sign up to Hacker Hunt!</Text>
        <FormControl
          id="username"
          isInvalid={!!errors?.username?.message}
          isRequired
        >
          <FormLabel fontSize={{ base: "sm", md: "md" }}>Username</FormLabel>
          <Input
            variant="primary"
            type="text"
            placeholder="Enter your username"
            fontSize={{ base: "sm", md: "md" }}
            {...register("username", {
              required: "Username is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
            {errors?.username && errors?.username?.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl id="email" isInvalid={!!errors?.email?.message} isRequired>
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
          isInvalid={!!errors?.password?.message}
          isRequired
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: value => {
                  return (
                    [/[A-Z]/, /[0-9]/].every(pattern => pattern.test(value)) ||
                    "Must include uppercase letters and numbers"
                  );
                },
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
        </FormControl>
        <Button
          variant="primary"
          type="submit"
          w="full"
          isLoading={isSubmitting}
          loadingText="Submitting"
          isDisabled={!!errors.email || !!errors.password || !!errors.username}
        >
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
