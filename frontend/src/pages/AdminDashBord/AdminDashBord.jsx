import { Box, Button, Flex, Switch } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { blockUnblock, getAllusers } from "../../http";
import styled from "styled-components";
import DataTable from "react-data-table-component";
const AdminDashBord = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState();
  const handleUser = async (event, userId) => {
    const data = await blockUnblock({
      blockStatus: event.target.checked,
      userId,
    });
    setFilteredData(
      filteredData.map((user) => {
        if (user._id === userId) {
          user.blockStatus = !user.blockStatus;
        }
        return user;
      })
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllusers();
      console.log(data.data);
      setUsers(data.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredData(
      users.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText,users]);
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };


  const columns = [
    { name: "Name", selector: "name" },
    {
      name: "Photo",
      selector: "avatar",
      cell: (row) => (
        <img
          src={row.avatar}
          alt="Avatar"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            padding: "10px",
          }}
        />
      ),
    },
    { name: "Phone", selector: "phone" },
    {
      name: "Action",
      cell: (row) => (
        <Switch
          isChecked={row.blockStatus}
          onChange={(event) => handleUser(event, row.id)}
        >
          Block Status
        </Switch>
      ),
    },
  ];
  const StyledDataTable = styled(DataTable)`
    .rdt_TableRow:nth-of-type(even) {
      background-color: #182a46;
      color: #fff;
    }
    .rdt_TableRow:nth-of-type(odd) {
      background-color: #182a46;
      color: #fff;
    }

    .rdt_TableRow:hover {
      background-color: #61f0d3 !important;
      color: #000;
    }
  `;
  return (
    <>
      <Flex flexDirection="column" alignItems="center" height="100vh">
        <h2>Admin dashBorard</h2>
        <Box w="90%">
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
          />
          <br />
          <br />

          <StyledDataTable
            columns={columns}
            data={filteredData}
            pagination={true}
            striped={true}
            highlightOnHover={true}
            theme="dark"
          />
        </Box>
      </Flex>
    </>
  );
};

export default AdminDashBord;
