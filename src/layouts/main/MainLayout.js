import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

function MainLayout(props) {
  const authBg = useColorModeValue("white", "navy.900");
  return (
    <Box
      bg={authBg}
      float="right"
      minHeight="100vh"
      height="100%"
      position="relative"
      w="100%"
      transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
      transitionDuration=".2s, .2s, .35s"
      transitionProperty="top, bottom, width"
      transitionTimingFunction="linear, linear, ease"
    >
      <Box mx='auto' minH='100vh'>{props.children}</Box>
    </Box>
  );
}

export default MainLayout;
