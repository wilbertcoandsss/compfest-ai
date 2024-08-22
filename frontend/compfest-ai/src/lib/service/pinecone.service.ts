// import { Pinecone } from "@pinecone-database/pinecone";
// import type { ManagePineconeIndexType } from "@lib/config";
// import { ManagePineconeIndex, PineconeNamespaces } from "@lib/config";
// import { PINECONE_CONFIG } from "@lib/config";
// import dotenv from "dotenv";
//
// dotenv.config();
//
// export class PineconeService {
//   private static instance: PineconeService;
//
//   private connection: Pinecone;
//
//   constructor() {
//     this.connection = new Pinecone({
//       apiKey: process.env.PINECONE_API_KEY as string,
//     });
//
//     if (!this.connection) {
//       throw new Error("Failed to initialize Pinecone connection");
//     }
//   }
//
//   public static getInstance(): PineconeService {
//     if (!PineconeService.instance) {
//       PineconeService.instance = new PineconeService();
//     }
//     return PineconeService.instance;
//   }
//
//   async queryEmbeddings({
//     queryText,
//     namespace,
//     topK = PINECONE_CONFIG.similarityQuery.topK,
//   }: {
//     topK?: number;
//     queryText: string;
//     namespace: string;
//   }): Promise<any> {
//     throw new Error("Not yet implemented");
//     // const queryEmbedding = await openAiService.createEmbeddings({ queryText });
//
//     // const queryResult = await this.connection
//     //   .index(PINECONE_CONFIG.indexName)
//     //   .namespace(namespace)
//     //   .query({
//     //     ...PINECONE_CONFIG.similarityQuery,
//     //     topK: topK,
//     //     vector: queryEmbedding.data[0].embedding,
//     //   });
//     //
//     // return {
//     //   queryText,
//     //   queryResult,
//     // };
//   }
//
//   async queryUserById({ userId }: { userId: string }) {
//     throw new Error("Not updated");
//
//     const index = this.connection.Index(PINECONE_CONFIG.indexName);
//     try {
//       const queryResponse = await index
//         .namespace(PineconeNamespaces.user)
//         .fetch([userId]);
//
//       if (!queryResponse.records) {
//         throw new Error("User not found");
//       }
//
//       return queryResponse.records;
//     } catch (error) {
//       throw new Error(`Error querying user by ID: ${userId}. Error: ${error}`);
//     }
//   }
//
//   async manageIndex(action: ManagePineconeIndexType): Promise<string> {
//     try {
//       const indextExists = (await this.connection.listIndexes()).indexes?.some(
//         (index) => index.name === PINECONE_CONFIG.indexName,
//       );
//
//       if (action == ManagePineconeIndex.create) {
//         if (indextExists) {
//           throw new Error("Index already exists");
//         }
//
//         await this.connection.createIndex({
//           name: PINECONE_CONFIG.indexName,
//           dimension: PINECONE_CONFIG.dimensions,
//           metric: PINECONE_CONFIG.metric,
//           spec: {
//             serverless: {
//               cloud: PINECONE_CONFIG.cloud,
//               region: PINECONE_CONFIG.region,
//             },
//           },
//         });
//         return "Success";
//       }
//
//       if (action == ManagePineconeIndex.delete) {
//         if (!indextExists) {
//           throw new Error("Index does not exist");
//         }
//         await this.connection.deleteIndex(PINECONE_CONFIG.indexName);
//         return "Success";
//       }
//
//       throw new Error("Invalid action");
//     } catch (error) {
//       throw error;
//     }
//   }
// }
//
// export const pineconeService = PineconeService.getInstance();
