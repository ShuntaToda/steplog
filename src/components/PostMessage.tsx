'use client';
import { Box, Button, TextField, Typography } from "@mui/material"
import { Logo } from "./Logo"
import Link from "next/link"
import { ChangeEvent, FormEvent, useState } from "react";
import { postMessage } from "@/apis/messageText";

type PostData = {
  nickname: string;
  text: string;
}
export const PostMessage = () => {
  const [postData, setPostData] = useState<PostData>({
    nickname: '',
    text: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    postMessage({
      name: postData.nickname,
      text: postData.text,
    })
  }

  return (
    <>
      <Logo color="black" />
      <Box className="max-w-md mx-auto mt-3 p-6 bg-white rounded-lg shadow-xl">
        <Typography variant="h5" className="mb-4 text-center text-gray-800">
          新規投稿
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="ニックネーム"
            variant="outlined"
            name="nickname"
            value={postData.nickname}
            onChange={handleInputChange}
            className="bg-gray-50"
          />
          <TextField
            fullWidth
            label="テキスト"
            variant="outlined"
            multiline
            rows={4}
            name="text"
            value={postData.text}
            onChange={handleInputChange}
            className="bg-gray-50"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            投稿する
          </Button>
        </form>
        <Box display={"flex"} justifyContent={"center"} mt={4}>
          <Link href={"/"}>
            <Button>ホームへ戻る</Button>
          </Link>
        </Box>
      </Box></>
  )
}
