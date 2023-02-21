import { Document, WithId } from "mongodb";

interface Tag extends WithId<Document> {
    _id: ObjectId | string;
    title: string;
}

interface TagLabelAndValue {
    label: string;
    value: string;
}

export default Tag;
export { TagLabelAndValue };