import React from "react";

// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Progress,
  Text,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";

import Card from "../../../components/cards/Card";
import IconBox from "../../../components/icons/IconBox";

// Assets
import { MdOutlineCloudDone } from "react-icons/md";

function Accuracy(props) {
  const { used, total, loading } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  const box = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  return (
    <Card mb={{ base: "0px", lg: "0px" }} align="center">
      <IconBox
        mt="60px"
        mx="auto"
        h="100px"
        w="100px"
        icon={
          <Icon as={MdOutlineCloudDone} color={brandColor} h="46px" w="46px" />
        }
        bg={box}
      />
      <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
        Algorithm Accuracy
      </Text>
      <Text
        color={textColorSecondary}
        fontSize="md"
        maxW={{ base: "100%", xl: "80%", "3xl": "60%" }}
        mx="auto"
      >
        {/* Algorithm Accuracy */}
      </Text>
      <Box w="100%" mt="auto">
        {loading ? (
          <>
            <Skeleton h="21px" w="100%" mb="10px" />
            <Skeleton h="12px" w="100%" />
          </>
        ) : (
          <>
            <Flex w="100%" justify="space-between" mb="10px">
              <Text color={textColorSecondary} fontSize="sm" maxW="40%">
                {used} %
              </Text>
              <Text color={textColorSecondary} fontSize="sm" maxW="40%">
                {total} %
              </Text>
            </Flex>
            <Progress
              align="start"
              colorScheme="brandScheme"
              value={(used / total) * 100}
              w="100%"
            />
          </>
        )}
      </Box>
    </Card>
  );
}

export default Accuracy;
