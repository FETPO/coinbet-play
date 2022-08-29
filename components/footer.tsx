import { Box, Text } from "@chakra-ui/react"
import { FC } from "react"

const Footer: FC = () => {
  return (
    <Box  my="md" py="md" sx={{ textAlign: "center", borderTop: "1px solid lightgray" }}>
      <Text>
        Made with &hearts; by <a href="https://coinbet.finance">coinbet</a>
      </Text>
    </Box>
  )
}

export default Footer
