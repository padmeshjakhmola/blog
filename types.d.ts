interface AWSFILEUPLOAD {
  Bucket: string;
  Key: string | undefined;
  Body?: Buffer | Uint8Array | Blob | string | ReadableStream;
  ContentType?: string;
  ACL?: string;
}

interface GetObjectParam {
  Bucket: string;
  Key: string;
}

type Blog = {
  id: string;
  authorId: string;
  blogName: string;
  author: string;
  blogDescription: string;
  createdAt: string;
  blogImage: string;
};
