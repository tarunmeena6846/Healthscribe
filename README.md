# AVON

Avon is no-code/low-code platform to build custom EMR.

## Tech Stack

**Client:** React, Recoil, TailwindCSS

**Server:** Node, Express, aws-sdk, bcrypt, multer, mongoose

## Run Locally

Clone the project

```bash
  git clone https://github.com/tarunmeena6846/Avon_Assignment.git
```

**Backend**

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Install Python dependencies

```bash
  pip install boto3
```

Start the server

```bash
  tsc && node dist/index.js
```

**Frontend**

```bash
  cd provider
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**Backend**

`MONGODB_URL=your_mongodb_connection_url`
`AWS_ACCESS_KEY=aws_iam_access_key`
`AWS_SECRET_KEY=aws_iam_secret_key`
`AWS_BUCKET_NAME=aws_bucket_name`
`AWS_USER_ROLE=aws_user_role_arn`

**Frontend**

`VITE_SERVER_URL=http://localhost:3001`
