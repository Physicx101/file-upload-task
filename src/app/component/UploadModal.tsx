'use client'

import React, { useRef, useEffect } from 'react'

interface Props {
  closeModal: () => void
  onFileSelected: (url: string) => string
}

interface UploadedFile {
  fileName: string
  url: string
}

const DO_ENDPOINT = `http://${process.env.S3_BUCKET}/${process.env.DIGITAL_OCEAN_ENDPOINT}`

export default function UploadModal({ closeModal, onFileSelected }: Props) {
  const [file, setFile] = React.useState<File | null>(null)
  const [isUplaoding, setIsUploading] = React.useState<boolean>(false)
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>([])

  const inputFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    getUploadedFiles()
  }, []);



  const getUploadedFiles = async () => {
    try {
      const response = await fetch('/api/upload')
      const results = await response.json()
      const uploadedFiles = results.map((result: any) => ({
        fileName: result.Key,
        url: `${DO_ENDPOINT}/${result.Key}`,
      }))
      setUploadedFiles(uploadedFiles)
    } catch (error) {
      console.error(error)
    }
  }

  const uploadFile = async (file: File) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      setIsUploading(true)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      await response.json()
    } catch (error) {
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    if (!file) return
    setFile(file)
    await uploadFile(file)
    await getUploadedFiles()
  }

  const onDropFile = async (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (!file) return
    setFile(file)
    await uploadFile(file)
    await getUploadedFiles()
  }

  const onClickDropFile = () => {
    if (inputFileRef.current) inputFileRef.current.click()
  }


  return (
    <div className={`fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4`}>
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
        <div className="flex justify-end p-2">
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={closeModal}
          >
            X
          </button>
        </div>

        <div className="p-6 pt-0 text-center">
          <div
            className="w-full h-[250px] border cursor-pointer mb-5"
            onDrop={!isUplaoding ? onDropFile : undefined}
            onDragOver={(event) => event.preventDefault()}
            onClick={!isUplaoding ? onClickDropFile : undefined}
          >
            <span>{isUplaoding ? 'Uploading File......' : 'Select file or drag here'}</span>
            <input type="file" accept="*/*" onChange={onChangeFile} ref={inputFileRef} hidden />
          </div>
          <div>
            <p className="font-semibold text-l mb-5">Uploaded Files</p>
            {uploadedFiles.map((file, index) => {
              return (
                <div key={index} className="flex justify-between mb-2">
                  <span>{file.fileName}</span>
                  <button
                    onClick={() => onFileSelected(file.url)}
                    className="border bg-blue-600 text-white rounded-md px-5 py-1"
                  >
                    select
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
