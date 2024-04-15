import React from "react";
import { Flex } from "@chakra-ui/react";

function IconBox(props) {
  const { icon, ...rest } = props;

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"50%"}
      {...rest}>
      {icon}
    </Flex>
  );
}

export default IconBox;