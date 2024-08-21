import {
  IndexModelMetricEnum,
  ServerlessSpecCloudEnum,
} from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch";
import dotenv from "dotenv";

dotenv.config();

export const PINECONE_CONFIG = {
  similarityQuery: {
    topK: 5, // Top result limit
    includeValues: false, // exclude vector value
    includeMetadata: true, // include metadata
  },
  // namespace: "", // Pinecone namespace
  indexName: process.env.PINECONE_INDEX_NAME as string, // Pinecone index name
  // embeddingID:"" // Embedding identifier
  dimensions: 1024,
  metric: IndexModelMetricEnum.Cosine, // Similarity metric
  cloud: ServerlessSpecCloudEnum.Aws,
  region: process.env.PINECONE_REGION as string,
} as const;
