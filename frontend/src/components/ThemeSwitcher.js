

import { Switch, useColorMode } from '@chakra-ui/react'
import React from 'react'

const ThemeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
      <Switch color="#65fbd7" isChecked={colorMode === "dark"} onChange={toggleColorMode} />
    )
}

export default ThemeSwitcher