import { Tab, TabProps, useColorModeValue } from "@chakra-ui/react";
import { Transition, motion } from "framer-motion";
import { useRouter } from "next/router";

const UserTab = ({
  children,
  name,
  active,
  ...props
}: TabProps & { name: string; active: boolean }) => {
  const { push, asPath } = useRouter();
  const color = useColorModeValue("brand.800", "white");
  const animateColor = useColorModeValue("black", "white");

  const transition: Transition = {
    type: "spring",
    duration: 2,
    delay: 0,
    stiffness: 500,
    damping: 30,
  };

  return (
    <Tab
      _selected={{
        fontWeight: "bold",
        borderBottomWidth: 2,
        borderBottomColor: color,
        color,
      }}
      onClick={() =>
        push({
          pathname: asPath.split("?")[0],
          query: { tab: name },
        })
      }
      {...props}
    >
      {active ? (
        <motion.div
          layoutId="underline"
          className="outline"
          initial={{ x: 0, opacity: 0.9 }}
          animate={{ borderColor: animateColor, x: 0, opacity: 1 }}
          transition={transition}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </Tab>
  );
};

export default UserTab;
