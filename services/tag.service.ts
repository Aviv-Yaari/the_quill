import TagModel from "@/types/models/tag.model";
import { TagLabelAndValue } from "@/types/Tag";
import clientPromise from "@/utils/mongodb";

async function getTagsFromDB() {
  const client = await clientPromise;
  const db = client.db("main");
    
  const result = await db
    .collection("tags")
    .find({})
    .toArray();
  
  const tags: TagLabelAndValue[] = (result as TagModel[]).map(option => ({ value: option.title, label: option.title }));
  return tags;
}

export { getTagsFromDB };