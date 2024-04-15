/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
// Chakra imports
import { Box, Icon, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import { MdBarChart, MdFileCopy, MdPerson, MdViewQuilt } from "react-icons/md";
import MiniStatistics from "../../components/cards/MiniStatistics";
import IconBox from "../../components/icons/IconBox";
import PieCard from "./components/PieCard";
import Accuracy from "./components/Accuracy";
import BarCard from "./components/BarCard";
import { getDashboardData } from "../../services/ApiService";

function Dashboard(props) {
  const [stats, setStats] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [documentsDistribution, setDocumentsDistribution] = useState(null)
  const [documentsTypes, setDocumentsTypes] = useState(null)
  const [isLoading, setIsLoading] = useState(true);

  const getInfo = async () => {
    try {
      await getDashboardSectionData('accuracy', setAccuracy);
      await getDashboardSectionData('stats', setStats);
      await getDashboardSectionData('distribution', setDocumentsDistribution);
      await getDashboardSectionData('documents_type', setDocumentsTypes);
      setIsLoading(false);
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    getInfo();
  }, [])

  const getDashboardSectionData = async (section, setState) => {
    const response = await getDashboardData(section);
    if (response.status === 200) {
      setState(response.data[section]);
    }
  }

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 4 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          loading={isLoading}
          name="Total docs"
          value={stats ? stats['total_docs'] : 0}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          loading={isLoading}
          name="Scanned docs"
          value={stats ? stats['scanned_docs'] : 0}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdPerson} color={brandColor} />}
            />
          }
          loading={isLoading}
          name="Users"
          value={stats ? stats['users'] : 0}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdViewQuilt} color={brandColor} />
              }
            />
          }
          loading={isLoading}
          name="Sensitive Data"
          value={stats ? stats['sensitive_data'] : 0}
        />
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 3, xl: 3 }}
        gap="20px"
        mb="20px"
      >
        <PieCard 
          loading={isLoading}
          data={documentsDistribution}
        />
        <Accuracy 
          loading={isLoading}
          used={accuracy ? accuracy : 0}
          total={100}
        />
        <BarCard
          loading={isLoading}
          data={documentsTypes}
        />
      </SimpleGrid>
    </Box>
  );
}

export default Dashboard;
