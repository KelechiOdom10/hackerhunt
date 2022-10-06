/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Text,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import React from "react";
import { useForm } from "react-hook-form";
import { MutationCreateLinkArgs } from "../../apollo/generated/graphql";
import { useCreateLink } from "../../hooks/useCreateLink";
import { tags } from "../../lib/selectOptions";

export interface Item {
  label: string;
  value: string;
}

export default function CreatePostForm() {
  const toast = useToast();
  const [pickerItems, setPickerItems] = React.useState(tags);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);
  const selectedItemsFlat = selectedItems.map(item => item.label.toLowerCase());
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MutationCreateLinkArgs>();

  const createLink = useCreateLink();

  const onSubmit = async (data: MutationCreateLinkArgs) => {
    try {
      await createLink({ variables: data });
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    }
  };

  const handleCreateItem = (item: Item) => {
    setPickerItems(curr => [...curr, item]);
    setSelectedItems(curr => [...curr, item]);
  };

  const handleSelectedItemsChange = (items?: Item[]) => {
    if (items) {
      setSelectedItems(items);
    }
    if (selectedItems.length > 0) errors.tags = null;
  };

  return (
    <Box
      maxW="6xl"
      mx="auto"
      bg={useColorModeValue("white", "gray.800")}
      p={{ base: 6, md: 10 }}
      my={10}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={8} maxW="3xl" mx="auto">
          <Text fontSize={{ base: "lg", md: "3xl" }} fontWeight="bold">
            Create a new story
          </Text>
          <FormControl
            id="title"
            isRequired
            isInvalid={!!errors?.title?.message}
          >
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Title of story
            </FormLabel>
            <Input
              variant="primary"
              type="text"
              name="title"
              placeholder="Enter title of story "
              fontSize={{ base: "sm", md: "md" }}
              {...register("title", { required: "Title is required" })}
            />
            <FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
              {errors?.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="url" isRequired isInvalid={!!errors?.url?.message}>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              URL of story
            </FormLabel>
            <Input
              variant="primary"
              type="url"
              name="url"
              placeholder="Enter URL of story "
              fontSize={{ base: "sm", md: "md" }}
              {...register("url", { required: "URL is required" })}
            />
            <FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
              {errors?.url && errors.url.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="tags"
            isRequired
            isInvalid={
              // @ts-ignore
              !!errors?.tags?.message
            }
          >
            <CUIAutoComplete
              label="Tags"
              placeholder="Choose or create at least one tag"
              onCreateItem={handleCreateItem}
              items={pickerItems}
              renderCustomInput={inputProps => (
                <>
                  <Input variant="primary" name="tags" {...inputProps} />
                </>
              )}
              inputStyleProps={{
                mt: selectedItemsFlat.length <= 0 ? -4 : 0,
              }}
              labelStyleProps={{
                fontSize: { base: "sm", md: "md" },
              }}
              listStyleProps={{
                bg: useColorModeValue("white", "gray.900"),
                color: useColorModeValue("gray.900", "gray.50"),
              }}
              listItemStyleProps={{
                _hover: {
                  bg: useColorModeValue("gray.100", "gray.600"),
                  color: useColorModeValue("gray.900", "gray.50"),
                },
                _selected: {
                  bg: useColorModeValue("gray.100", "gray.600"),
                  color: useColorModeValue("gray.900", "gray.50"),
                },
              }}
              highlightItemBg={useColorModeValue("yellow.30", "yellow.600")}
              selectedItems={selectedItems}
              onSelectedItemsChange={changes =>
                handleSelectedItemsChange(changes.selectedItems)
              }
              // @ts-ignore
              refs={{
                ...register("tags", {
                  required: {
                    value: selectedItems.length <= 0,
                    message: "Please select or create at least 1 tag",
                  },
                  value: selectedItemsFlat,
                }),
              }}
            />
            <FormErrorMessage
              mt={-4}
              fontSize={{ base: "sm", md: "sm", lg: "md" }}
            >
              {selectedItemsFlat.length <= 0 &&
                errors?.tags &&
                // @ts-ignore
                errors.tags?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            variant="primary"
            type="submit"
            w="full"
            isLoading={isSubmitting}
            loadingText="Creating"
            isDisabled={!!errors.title || !!errors.url}
          >
            Create story
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
