// import { useColorModeValue, useColorMode } from "@chakra-ui/react";
import {
  useColorModeValue,
  //   useColorMode,
  Input,
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { tags } from "../../lib/selectOptions";

export default function CustomSelect() {
  //   const { colorMode } = useColorMode();
  return (
    <CUIAutoComplete
      label="Tags"
      placeholder="Choose or create at least one tag"
      //   onCreateItem={handleCreateItem}
      items={tags}
      renderCustomInput={inputProps => (
        <Input variant="primary" {...inputProps} />
      )}
      labelStyleProps={{
        mb: -2,
      }}
      listStyleProps={{
        bg: useColorModeValue("white", "brand.900"),
        color: useColorModeValue("gray.900", "gray.50"),
        // height: "100px",
        // overflowY: "auto",
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

      //   highlightItemBg={useColorModeValue("yellow.30", "yellow.600")}
      //   selectedItems={selectedItems}
      //   onSelectedItemsChange={changes =>
      //     handleSelectedItemsChange(changes.selectedItems)
      //   }
    />
  );
}
