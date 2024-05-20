This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and it shows a simple functionality of uploading a file to a digital ocean spaces bucket using the AWS S3 Client SDK.

## Building the Project

First, install the required dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project also requires these .env variables to be declared in your .env file:

```bash
S3_BUCKET=(Digital Ocean spaces Bucket name)
S3_ACCESS_KEY=(Spaces access key)
S3_SECRET_KEY=(Spaces secret key)
S3_REGION=(Spaces region)
DIGITAL_OCEAN_ENDPOINT=(Digital Ocean origin endpoint without bucket name - usually {region}.digitaloceanspaces.com)
```

## Project Info

This project consists of 3 mainly important files to support the functionality:
- **page.tsx**: home page that opens the upload component and shows the retrieved url of uploaded file location.
- **api/upload/route.ts**: s3 client and functionality to get and post to digital ocean server.
- **component/UploadModal.tsx**: file upload component that allows user to upload a file and retrieve all uploaded files.