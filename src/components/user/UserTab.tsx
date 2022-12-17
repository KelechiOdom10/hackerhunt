import { Tab, TabProps, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

const UserTab = ({ children, name, ...props }: TabProps & { name: string }) => {
  const { push, asPath } = useRouter();

  return (
    <Tab
      _selected={{
        fontWeight: "bold",
        borderBottomWidth: 2,
        borderBottomColor: useColorModeValue("brand.800", "white"),
        color: useColorModeValue("brand.800", "white"),
      }}
      onClick={() =>
        push({
          pathname: asPath.split("?")[0],
          query: { tab: name },
        })
      }
      {...props}
    >
      {children}
    </Tab>
  );
};

export default UserTab;
