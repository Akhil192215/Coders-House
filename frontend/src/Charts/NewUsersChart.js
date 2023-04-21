import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import {
  getTotalNumberOfAudio,
  getTotalNumberOfCoding,
  getTotalNumberOfUsers,
  getUserData,
} from "../http";
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  BsPersonPlusFill,
  BsHouseAddFill,
  BsFillFileCodeFill,
  BsPerson,
  BsBarChart,
} from "react-icons/bs";
import AdminDashBord from "../pages/AdminDashBord/AdminDashBord";
function NewUsersChart({ timePeriod }) {
  const chartRef = useRef();
  const [newUsers, setNewUsers] = useState([]);
  const [totalUsers, setToatalUsers] = useState("");
  const [totalAudio, setTotalAudio] = useState("");
  const [totalCoding, setTotalCoding] = useState("");
  const { colorMode } = useColorMode();
  useEffect(() => {
    async function fetchUserData() {
      try {
        let { data } = await getUserData();
        setNewUsers(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);
  useEffect(() => {
    async function fetchCoding() {
      try {
        let { data } = await getTotalNumberOfCoding();
        setTotalCoding(data.count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCoding();
  }, []);
  useEffect(() => {
    async function fetchAudioData() {
      try {
        let { data } = await getTotalNumberOfAudio();
        setTotalAudio(data.count);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAudioData();
  }, []);

  useEffect(() => {
    const getTotalUsers = async () => {
      const { data } = await getTotalNumberOfUsers();

      setToatalUsers(data.count);
    };
    getTotalUsers();
  }, []);
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: newUsers.map((data) => data.week),
        datasets: [
          {
            label: "New Users",
            data: newUsers.map((data) => data.new_users),
            backgroundColor: colorMode === "dark" ? "#65fbd7" : "#0b192f",
            borderColor: colorMode === "dark" ? "#0b192f" : "#65fbd7",

            borderWidth: 1,
            maxBarThickness: 200,
            maxBarHeight: 100,
          },
        ],
      },
      options: {
        animations: {
          y: {
            easing: "easeInOutElastic",
            from: (ctx) => {
              if (ctx.type === "data") {
                if (ctx.mode === "default" && !ctx.dropped) {
                  ctx.dropped = true;
                  return 0;
                }
              }
            },
          },
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          maxHeight: 500,
          maxWidth: 800,
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [newUsers]);

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Box display="flex">
        <Box
          display="flex"
          padding={5}
          pt="7"
          margin={10}
          width={223}
          height={130}
          bg={colorMode === "dark" ? "#65fbd7" : "#0b192f"}
          color={colorMode === "dark" ? "#0b192f" : "#65fbd7"}
        >
          <Box mr="10">
            {" "}
            <Text fontSize="38px" fontWeight="bold">
              {totalUsers}
            </Text>
            <Text fontWeight="900" fontSize="10px">
              TOTAL USERS JOINED
            </Text>
          </Box>
          <br />
          <Box>
            <BsPersonPlusFill color="#0b192f" fontSize="55px" />
          </Box>
        </Box>
        <Box
          display="flex"
          padding={5}
          pt="7"
          margin={10}
          width={223}
          height={130}
          bg={colorMode === "dark" ? "#65fbd7" : "#0b192f"}
          color={colorMode === "dark" ? "#0b192f" : "#65fbd7"}
        >
          <Box mr="10">
            {" "}
            <Text fontSize="38px" fontWeight="bold">
              {totalAudio}
            </Text>
            <Text fontWeight="900" fontSize="10px">
              {" "}
              AUDIO ROOMS CREATED
            </Text>
          </Box>
          <br />
          <Box>
            <BsHouseAddFill color="#0b192f" fontSize="55px" />
          </Box>
        </Box>
        <Box
          display="flex"
          padding={5}
          pt="7"
          margin={10}
          width={223}
          height={130}
          bg={colorMode === "dark" ? "#65fbd7" : "#0b192f"}
          color={colorMode === "dark" ? "#0b192f" : "#65fbd7"}
        >
          <Box borderTopLeftRadius="lg" borderBottomRightRadius="md" mr="10">
            {" "}
            <Text fontSize="38px" fontWeight="bold">
              {totalCoding}
            </Text>
            <Text fontWeight="900" fontSize="9px">
              {" "}
              CODING ROOMS CREATED
            </Text>
          </Box>
          <br />

          <Box>
            <BsFillFileCodeFill color="#0b192f" fontSize="55px" />
          </Box>
        </Box>
      </Box>

      <Box width="90%" justifyContent="center" alignItems="center">
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Box display="flex" flexDirection="column">
              {" "}
              <Tab mb="50px">
                {" "}
                <BsPerson />
              </Tab>
              <Tab>
                {" "}
                <BsBarChart />
              </Tab>
            </Box>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box width="70%">
                  <canvas ref={chartRef} />
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box width="100%">
                  {" "}
                  <AdminDashBord />
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}

export default NewUsersChart;
