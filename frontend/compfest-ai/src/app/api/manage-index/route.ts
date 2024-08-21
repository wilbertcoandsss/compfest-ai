import { ManagePineconeIndex } from "@lib/config";
import { pineconeService } from "@lib/service/pinecone.service";

export async function POST() {
  const res = await pineconeService.manageIndex(ManagePineconeIndex.create);

  return Response.json({
    message: res,
  });
}
