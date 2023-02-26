import { ObjectId } from "mongodb";

interface TagModel extends WithId<Document> {
    _id: ObjectId;
    title: string;
};

export default TagModel;