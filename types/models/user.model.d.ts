import { WithId } from "mongodb";

interface UserModel extends WithId<Document> {
    username: string;
    password: string;
}

export default UserModel;