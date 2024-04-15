/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

// Chakra imports
import { Box, Center, Flex, Spinner, Text, useColorModeValue } from "@chakra-ui/react";

import Card from "../../../components/cards/Card";
import BarChart from "../../../components/charts/BarChart";

// const barChartDataConsumption = [
//   {
//     name: "Classified",
//     data: [50, 0, 0, 0, 0, 0, 0, 0],
//   },
// ];
const barChartOptionsConsumption = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
  },
  xaxis: {
    categories: [
      ".pdf",
      ".docx",
      ".doc",
      ".xlsx",
      ".csv",
      ".pptx",
      ".ppt",
      "others",
    ],
    show: false,
    labels: {
      show: true,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
    color: "black",
    labels: {
      show: false,
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },
  grid: {
    borderColor: "rgba(163, 174, 208, 0.3)",
    show: true,
    yaxis: {
      lines: {
        show: false,
        opacity: 0.5,
      },
    },
    row: {
      opacity: 0.5,
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: "solid",
    colors: ["#28a745", "#6AD2FF"],
  },
  legend: {
    show: false,
  },
  colors: ["#28a745", "#6AD2FF"],
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: "20px",
    },
  },
};

function BarCard(props) {
  const { data, loading } = props;

  const [chartOptions, setChartOptions] = useState(barChartOptionsConsumption)
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if(data) transformData(data)
  }, [data])

  const transformData = (data) => {
    const labels = Object.keys(data)
    let dataArray = []
    labels.forEach((label) => {
      dataArray.push(data[label])
    })
    setChartOptions({
      ...chartOptions,
      xaxis: {
        ...chartOptions.xaxis,
        categories: labels
      }
    })
    setChartData([
      {
        name: 'Classified',
        data: dataArray
      }
    ])
  }

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card align="center" direction="column" w="100%">
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text
          me="auto"
          color={textColor}
          fontSize="xl"
          fontWeight="700"
          lineHeight="100%"
        >
          Documents Type
        </Text>
      </Flex>

      <Box h="240px" mt="auto">
        {
          loading ? (
            <Center h='100%'>
              <Spinner size='xl'/>
            </Center>
          ):(
            <BarChart
              key={JSON.stringify(chartData)}
              chartData={chartData}
              chartOptions={chartOptions}
            />
          )
        }
      </Box>
    </Card>
  );
}

export default BarCard;
