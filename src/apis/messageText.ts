import { hostPath } from "./hostPath"


export const fetchMessages = async() => {
  const res = await fetch(`${hostPath}/default/StepLogGetData`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
}


type postMessageData = {
  name: string,
  text: string,
}
export const postMessage = async (postData: postMessageData) => {
  const res = await fetch(`${hostPath}/default/StepLogIncertData/text`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })

  const data = await res.json()
  console.log(data);
  
}
export const postImage = async (formData: FormData) => {
  const res = await fetch(`${hostPath}/default/StepLogIncertData`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: formData
  })

  const data = await res.json()
  console.log(data);
  
}
