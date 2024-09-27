import { Box } from "@mui/material"
import Image from "next/image"

export const ImageContent = () => {
  return (
    <Box position={"relative"} height={"100%"}>
      <Image
        src={"https://picsum.photos/200/300"}
        width={200}
        height={300}
        alt="image"
        className="h-full w-full object-cover"
      />
    </Box>
  )
}
