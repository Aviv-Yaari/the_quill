import { Document, WithId } from "mongodb";

interface TagIdAndTitle extends WithId<Document> {
    _id: ObjectId | string;
    title: string;
}

interface TagLabelAndValue {
    label: string;
    value: string;
}

export { TagIdAndTitle, TagLabelAndValue };