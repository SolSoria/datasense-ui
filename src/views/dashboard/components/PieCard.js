/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  SimpleGrid,
  Skeleton,
  Center,
  Spinner,
} from "@chakra-ui/react";

import Card from "../../../components/cards/Card";
import PieChart from "../../../components/charts/PieChart";

const pieChartOptions = {
  colors: ["#ff0f0f", "#5E37FF", "#6AD2FF", "#E1E9F8"],
  chart: {
    width: "50px",
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  hover: { mode: null },
  plotOptions: {
    donut: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  fill: {
    colors: ["#ff0f0f", "#5E37FF", "#6AD2FF", "#E1E9F8"],
  },
  tooltip: {
    enabled: true,
    theme: "dark",
  },
};

function PieCard(props) {
  const { data, loading, ...rest } = props;
  const [chartData, setChartData] = useState([]);
  const [chartOptions, setChartOptions] = useState(pieChartOptions);
  const [percentages, setPercentages] = useState([]);

  useEffect(() => {
    if (data) transformData(data);
  }, [data]);

  const transformData = (data) => {
    const labels = data.map((item) => item["_id"]);
    const dataArray = data.map((item) => item["count"]);
    const total = dataArray.reduce((a, b) => a + b, 0);
    const percentages = dataArray.map((item) =>
      ((item / total) * 100).toFixed(0)
    );
    setChartData(dataArray);
    setPercentages(percentages);
    setChartOptions({
      ...chartOptions,
      labels: labels,
    });
  };

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  return (
    <Card p="20px" align="center" direction="column" w="100%" {...rest}>
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mb="8px"
      >
        <Text color={textColor} fontSize="xl" fontWeight="600" mt="4px">
          Documents Distribution
        </Text>
      </Flex>
      {
        !loading ? (
          <PieChart
          key={JSON.stringify(chartData)}
          h="100%"
          w="100%"
          chartData={chartData}
          chartOptions={chartOptions}
        />
        ): (
          <Center h='160'>
            <Spinner size="xl"/>
          </Center>
        )
      }
      <Card
        bg={cardColor}
        flexDirection="row"
        boxShadow={cardShadow}
        w="100%"
        p="15px"
        px="15px"
        mt="15px"
        mx="auto"
      >
        {loading ? (
          <Skeleton h="55px" w="100%" mt="30px" />
        ) : (
          <SimpleGrid
            style={{ width: "100%" }}
            columns={{ base: 4, md: 4, lg: 4, "2xl": 4 }}
            gap="10px"
          >
            {percentages.map((item, index) => (
              <Flex direction="column" py="5px" key={index} me="10px">
                <Flex align="center" justify="center">
                  <Box
                    h="8px"
                    w="8px"
                    bg={chartOptions.colors[index]}
                    borderRadius="50%"
                    me="4px"
                  />
                  <Text
                    fontSize="xs"
                    color="secondaryGray.600"
                    fontWeight="700"
                  >
                    {chartOptions.labels[index]}
                  </Text>
                </Flex>
                <Text fontSize="lg" color={textColor} fontWeight="700">
                  {item}%
                </Text>
              </Flex>
            ))}
          </SimpleGrid>
        )}
      </Card>
    </Card>
  );
}

export default PieCard;
