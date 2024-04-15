import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { HSeparator } from "../../separator/Separator";

function Brand(props) {
  return (
    <Flex align="center" direction="column">
      <Text my="10" fontWeight="900" fontSize="3xl">
        DATASENSE
      </Text>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default Brand;
