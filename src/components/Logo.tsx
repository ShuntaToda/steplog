import { Box, Typography } from "@mui/material"
import Link from "next/link"

type LogoProps = {
  color?: string
  position?: "absolute" | "relative"
}

export const Logo = ({ color = "white", position = "relative" }: LogoProps) => {
  return (
    <Box bgcolor={"transparent"} p={1} position={position} zIndex={999} top={0} left={0}>
      <Link href={"/"}>
        <Typography variant="h1" fontSize={"3rem"} color={color} fontWeight={"bold"}>StepLog</Typography>
      </Link>
    </Box>
  )
}
