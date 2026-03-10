const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

exports.uploadFile = async (file) => {
  try {
    console.log("Uploading to S3");

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: Date.now() + "-" + file.originalname,
      Body: file.buffer,
    };

    return await s3.upload(params).promise();
  } catch (error) {
    console.error("S3 Upload Error:", error.message);
    throw error;
  }
};

// Optional: Function to delete a file from S3
// exports.deleteFile = async (key) => {
//   try {
//     console.log("Deleting from S3");
