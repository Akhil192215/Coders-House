import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

const CreateRoom = ({onClose}) => {
  return (
   <>
   <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <p>one!</p>
      <button  onClick={onClose} >close</button>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>
</Tabs></>
  )
}

export default CreateRoom