'use client';

import { Box, Typography } from "@mui/material";
import { IoMdCloseCircle } from "react-icons/io";

type OpenTextProps = {
  toggleIsOpen: () => void
}

export const OpenText = ({ toggleIsOpen }: OpenTextProps) => {
  return (
    <Box position={"absolute"} zIndex={100} className={"animate-fadeIn duration-200 inset-0  bg-gradient-to-b from-transparent to-white bg-opacity-40 backdrop-blur flex justify-center items-center"} onClick={toggleIsOpen}>
      <Box position={"absolute"} top={0} right={0} py={5} px={2} onClick={toggleIsOpen}>
        <IoMdCloseCircle size={50} color="gray" onClick={toggleIsOpen} />
      </Box>
      <Typography className="p-8 font-bold text-gray-800" fontSize={30}>
        テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
      </Typography>
    </Box>
  )
}
