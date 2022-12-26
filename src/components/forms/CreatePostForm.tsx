import { useCallback, useState } from "react";
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
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useForm } from "react-hook-form";
import { CreateLinkInput } from "~/apollo/generated";
import { useCreateLink } from "~/hooks/useCreateLink";
import { tags } from "~/lib/selectOptions";

export interface Item {
  label: string;
  value: string;
}

export default function CreatePostForm() {
  const [pickerItems, setPickerItems] = useState(tags);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const selectedItemsFlat = selectedItems.map(item => item.label.toLowerCase());
  const form = useForm<CreateLinkInput>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const { mutate: createLink, isLoading } = useCreateLink();

  const onSubmit = async (input: CreateLinkInput) => {
    createLink({ input });
  };

  const handleCreateItem = (item: Item) => {
    setPickerItems(curr => [...curr, item]);
    handleSelectedItemsChange([...selectedItems, item]);
  };

  const handleSelectedItemsChange = useCallback(
    (items?: Item[]) => {
      if (items) {
        setSelectedItems(items);
        form.setValue(
          "tags",
          items.map(item => item.label.toLowerCase())
        );
      }
      if (selectedItems.length > 0) errors.tags = null;
    },
    [errors, form, selectedItems.length]
  );

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
              placeholder="Enter URL of story "
              fontSize={{ base: "sm", md: "md" }}
              {...register("url", { required: "URL is required" })}
            />
            <FormErrorMessage fontSize={{ base: "sm", md: "sm", lg: "md" }}>
              {errors?.url && errors.url.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl id="tags">
            <CUIAutoComplete
              label="Tags"
              placeholder="Choose or create at least one tag"
              onCreateItem={handleCreateItem}
              items={pickerItems}
              renderCustomInput={({ ref, ...inputProps }) => {
                return (
                  <Box ref={ref} w="full">
                    <Input
                      variant="primary"
                      name="tags"
                      {...inputProps}
                      autoFocus={false}
                    />
                  </Box>
                );
              }}
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
                errors.tags?.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            variant="primary"
            type="submit"
            w="full"
            isLoading={isSubmitting || isLoading}
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
