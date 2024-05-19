'use client'

export default function Home() {
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
        <button
          className="border py-2 px-5 bg-blue-600 text-white rounded-md mt-5"
          type="button">
          Upload
        </button>
      </div>
    </>
  )
}
