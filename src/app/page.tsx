'use client'

import React from 'react'
import UploadModal from './component/UploadModal'

export default function Home() {
  const [selectedFile, setSelectedFile] = React.useState<string>('')
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false)


  const closeModal = () => {
    setModalOpen(false)
  }

  const onClickUpload = () => {
    setModalOpen(true)
  }

  const onFileSelected = (url: string) => {
    setSelectedFile(url)
    closeModal()
    return url
  }

  return (
    <>
      <div className="absolute w-[400px] h-[400px] m-auto inset-0 p-4 rounded">
        <p className="font-semibold text-xl mb-5">Form</p>
        <div>
          <label htmlFor="name" className="block">
            Name
          </label>
          <input type="text" name="name" className="border-2 h-8 w-full" />
        </div>
        <div className="mt-3">
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea className="border-2 h-36 w-full" name="description" />
        </div>
        <div className="mt-3">
          <span className="block">File Selected : </span>
          <span>{selectedFile}</span>
        </div>
        <button
          className="border py-2 px-5 bg-blue-600 text-white rounded-md mt-5"
          type="button"
          onClick={onClickUpload}>
          Upload
        </button>
      </div>
      {isModalOpen && <UploadModal onFileSelected={onFileSelected} closeModal={closeModal} />}
    </>
  )
}
