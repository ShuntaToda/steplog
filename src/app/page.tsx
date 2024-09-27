import { Box, Card, Typography } from "@mui/material";
import { ImageContainer } from "@/components/ImageContainer";
import { Logo } from "@/components/Logo";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Logo position="absolute" />
      <ImageContainer />
      <Box className={"h-1/3 flex flex-col"}>
        <Box className={"py-2 mt-2 relative"}>
          <Typography textAlign={"center"}>Messgaes</Typography>
          <Box position={"absolute"} bottom={5} right={4}>
            <Link href={"form/message"}>
              <CiCirclePlus size={30} color="gray" />
            </Link>
          </Box>
        </Box>
        <Box
          className={"flex-grow flex flex-nowrap gap-4 overflow-x-auto px-4 pb-4"}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Box width={250} minWidth={250}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
              }}>
                <Typography sx={{ flexGrow: 1 }}>テキストテキストテキストテキストテキストテキスト</Typography>
                <Typography textAlign="end">ニックネーム</Typography>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
