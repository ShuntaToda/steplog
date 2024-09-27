'use client';

import { useOpenText } from "@/hooks/useOpenText";
import { Box, IconButton, Paper, Slide, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md"
import { OpenText } from "./OpenText";
import { useEffect, useState } from "react";
import { ImageContent } from "./ImageContent";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import { fetchMessages } from "@/apis/messageText";

export const ImageContainer = () => {
  const { isOpen, toggleIsOpen } = useOpenText()
  const [currentCount, setCurrentCount] = useState(0);
  const [nextCount, setNextCount] = useState<number | null>(null);

  const getMessages = async () => {
    const data = await fetchMessages()
    console.log(data);

  }
  useEffect(() => {
    getMessages()
  })

  return (
    <>
      <Paper className="w-full h-2/3 p-0 relative" sx={{ p: 1, overflow: "hidden" }} onClick={toggleIsOpen}>
        <Stack position={"absolute"} top={"50%"} width={"100%"} justifyContent={"space-between"} left={0} direction="row" alignItems="center" zIndex={1}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              if (nextCount == null) {
                setNextCount(currentCount - 1);
              } else {
                setCurrentCount(nextCount);
                setNextCount(nextCount - 1);
              }
            }}
          >
            <MdOutlineArrowBackIos color="white" size={20} />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              if (nextCount == null) {
                setNextCount(currentCount + 1);
              } else {
                setCurrentCount(nextCount);
                setNextCount(nextCount + 1);
              }
            }}
          >
            <MdOutlineArrowForwardIos color="white" size={20} />
          </IconButton>
        </Stack>
        <Box position={"absolute"} bottom={16} left={"50%"} zIndex={1} >
          <Link href="form" onClick={(e) => {
            e.stopPropagation()
          }}>
            <FiPlusCircle color="white" size={32} className="-translate-x-1/2" />
          </Link>
        </Box>
        <Box>
          <Slide
            key={currentCount}
            direction={
              nextCount == null
                ? undefined
                : currentCount > nextCount
                  ? "left"
                  : "right"
            }
            in={nextCount == null}
            appear={false}
          >
            <Box>
              <ImageContent />
            </Box>
          </Slide>
          {nextCount != null && (
            <Slide
              key={nextCount}
              in
              direction={nextCount > currentCount ? "left" : "right"}
              onEntered={() => {
                setCurrentCount(nextCount);
                setNextCount(null);
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: 0,
                  left: 0,
                  width: "100%"
                }}
              >

                <Box position={"relative"} height={"100%"}>
                  <Image
                    src={"https://picsum.photos/200/300"}
                    width={200}
                    height={300}
                    alt="image"
                    className="h-full w-full object-cover"
                  />
                </Box>
              </Box>
            </Slide>
          )}
        </Box>
      </Paper >
      {
        isOpen && <OpenText toggleIsOpen={toggleIsOpen} />
      }
    </>
  )
}
