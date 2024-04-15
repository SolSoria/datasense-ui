import { Flex } from "@chakra-ui/react";
import React from "react";

function SidebarCard(props) {
  const bgColor = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={bgColor}
      borderRadius="30px"
      position="relative"
    ></Flex>
  );
}

export default SidebarCard;