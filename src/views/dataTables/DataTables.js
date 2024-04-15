/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
// import userData from "./data/userData.json";
// import documentsData from "./data/documentsData.json";
import GenericTable from "../../components/table/Table";
import { getTablesData } from "../../services/ApiService";

const userDataColumns = [
  {
    Header: "NAME",
    type: "TEXT",
    accessor: "name",
  },
  {
    Header: "RESTRICTIVE",
    type: "TEXT",
    accessor: "Restrictive",
  },
  {
    Header: "CONFIDENTIAL",
    type: "TEXT",
    accessor: "Confidential",
  },
  {
    Header: "INTERNAL",
    type: "TEXT",
    accessor: "Internal",
  },
  {
    Header: "PUBLIC",
    type: "TEXT",
    accessor: "Public",
  },
  {
    Header: "RISK",
    type: "TEXT",
    accessor: "risk",
  },
];

const documentsDataColumns = [
  {
    Header: "NAME",
    type: "TEXT",
    accessor: "file_name",
  },
  {
    Header: "USER",
    type: "TEXT",
    accessor: "user",
  },
  {
    Header: "DEPARTMENT",
    type: "TEXT",
    accessor: "department",
  },
  {
    Header: "LABEL",
    type: "TEXT",
    accessor: "label",
  },
  {
    Header: "CLASSIFICATION DATE",
    type: "DATE",
    accessor: "classificationDate",
  },
  {
    Header: "CREATION DATE",
    type: "DATE",
    accessor: "creationDate",
  },
];

function DataTables(props) {
  const [userData, setUserData] = useState([]);
  const [documentsData, setDocumentsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await getUserData();
      await getDocumentsData();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const getUserData = async () => {
    const response = await getTablesData("users");
    if (response.status === 200) {
      setUserData(response.data["users"]);
    }
  };

  const getDocumentsData = async () => {
    const response = await getTablesData("documents");
    if (response.status === 200) {
      setDocumentsData(response.data["documents"]);
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <GenericTable
          loading={loading}
          columnsData={userDataColumns}
          tableData={userData}
          title="User Data"
        />
        <GenericTable
          loading={loading}
          columnsData={documentsDataColumns}
          tableData={documentsData}
          title="Documents Data"
        />
      </SimpleGrid>
    </Box>
  );
}

export default DataTables;
