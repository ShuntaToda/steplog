'use client';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { GiPhotoCamera } from 'react-icons/gi';
import { Logo } from './Logo';
import Link from 'next/link';
import { postImage } from '@/apis/messageText';
import { useLocalstrage } from '@/hooks/useLocalstrage';

type AcceptedFileTypes = 'image/jpeg' | 'image/png' | 'image/gif';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

class FileReadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileReadError';
  }
}

type PostData = {
  nickname: string;
  text: string;
  image: string | null;
}

export const PostImage = () => {
  const [postData, setPostData] = useState<PostData>({
    nickname: '',
    text: '',
    image: null
  });
  const [nickname, setNickname] = useLocalstrage("nickname", "")
  const [file, setFile] = useState<File | null>(null);

  function isAcceptedFileType(fileType: string): fileType is AcceptedFileTypes {
    return ['image/jpeg', 'image/png', 'image/gif'].includes(fileType);
  }

  function getImageBinary(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      if (!isAcceptedFileType(file.type)) {
        reject(new FileReadError('Unsupported file type'));
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        reject(new FileReadError('File size exceeds the limit'));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target?.result instanceof ArrayBuffer) {
          resolve(event.target.result);
        } else {
          reject(new FileReadError('Failed to read file as ArrayBuffer'));
        }
      };

      reader.onerror = () => {
        reject(new FileReadError('Error reading file'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setPostData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setPostData(prevData => ({
        ...prevData,
        image: URL.createObjectURL(selectedFile)
      }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (file) {
      try {
        const binaryData = await getImageBinary(file);

        // ここでバイナリデータを使用する処理を行う
        // 例: サーバーへの送信など

        // フォームデータとバイナリデータの送信例
        const formData = new FormData();
        formData.append('nickname', postData.nickname);
        formData.append('detail', postData.text);
        formData.append('image', file, file.name);

        // ここでformDataをサーバーに送信する処理を追加
        // 例: fetch('/api/submit', { method: 'POST', body: formData });
        // console.log(binaryData);
        postImage(formData)


      } catch (error) {
        if (error instanceof FileReadError) {
          console.error('File read error:', error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    } else {
      console.log('No file selected');
    }

    console.log('Form data:', postData);
  };

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
          <Box className="flex items-center space-x-2">
            <input
              accept="image/*"
              className="hidden"
              id="icon-button-file"
              type="file"
              name='image'
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton color="primary" aria-label="upload picture" component="span">
                <GiPhotoCamera />
              </IconButton>
            </label>
            <Typography variant="body2" className="text-gray-600">
              {postData.image ? '画像が選択されました' : '画像を選択してください'}
            </Typography>
          </Box>
          {postData.image && (
            <Box className="mt-2">
              <img src={postData.image} alt="選択された画像" className="max-w-full h-auto rounded-lg" />
            </Box>
          )}
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
      </Box>
    </>
  );
}