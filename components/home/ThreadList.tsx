import { ThreadItem } from './ThreadItem';
import { FlatList } from 'react-native';
import { IThread } from '../../types/model'

const testData: IThread[] = [
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806a",
        "user_id": "f3cb8535-9977-4a1c-874a-2c0e1bed503d",
        "username": "inconsistence",
        "university_abbreviated_name": "UMN",
        "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "subthread_id": "7a1311cd-a25e-4270-84e7-7d37774502cf",
        "subthread_name": "Perkuliahan",
        "subthread_color": "#00FFFF",
        "title": "Kuliah now",
        "content": "kuliah description description",
        "content_summary": "this is a summary",
        "is_active": true,
        "like_count": 0,
        "dislike_count": 0,
        "comment_count": 0,
        "created_by": "andi.usman@student.umn.ac.id",
        "created_at": "2024-11-09T20:16:52.744793Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "f943486f-f534-49a6-8d5d-0b456b226f18",
        "user_id": "f3cb8535-9977-4a1c-874a-2c0e1bed503d",
        "username": "inconsistence",
        "university_abbreviated_name": "UMN",
        "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
        "subthread_name": "LoveLife",
        "subthread_color": "#FFC0CB",
        "title": "My third love",
        "content": "this is a description",
        "content_summary": "this is a summary",
        "is_active": true,
        "like_count": 0,
        "dislike_count": 0,
        "comment_count": 0,
        "created_by": "andi.usman@student.umn.ac.id",
        "created_at": "2024-11-09T19:33:28.384301Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "3940cf54-4ae3-47ee-b8e6-e344206e6d9a",
        "user_id": "f3cb8535-9977-4a1c-874a-2c0e1bed503d",
        "username": "inconsistence",
        "university_abbreviated_name": "UMN",
        "university_image_url": "https://pacificgarden.co.id/wp-content/uploads/2021/10/Logo-UBM-Universitas-Bunda-Mulia-Original-1024x744.png",
        "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
        "subthread_name": "LoveLife",
        "subthread_color": "#FFC0CB",
        "title": "My second love",
        "content": "this is a description",
        "content_summary": "this is a summary",
        "is_active": true,
        "like_count": 0,
        "dislike_count": 0,
        "comment_count": 0,
        "created_by": "andi.usman@student.umn.ac.id",
        "created_at": "2024-11-09T19:33:24.5118Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "625468c0-0034-4554-a51f-96f8f68aa44e",
        "user_id": "f3cb8535-9977-4a1c-874a-2c0e1bed503d",
        "username": "inconsistence",
        "university_abbreviated_name": "UMN",
        "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
        "subthread_name": "LoveLife",
        "subthread_color": "#FFC0CB",
        "title": "My first love",
        "content": "this is a description",
        "content_summary": "this is a summary",
        "is_active": true,
        "like_count": 1,
        "dislike_count": 0,
        "comment_count": 1,
        "created_by": "andi.usman@student.umn.ac.id",
        "created_at": "2024-11-08T09:41:03.12703Z",
        "updated_by": null,
        "updated_at": null
    }
]

interface IThreadListProps {
    title: string
}

export const ThreadList = (props: IThreadListProps) => {

    const renderPost = ({ item }) => (
        <ThreadItem thread={item} />
    );

    return (
        <FlatList
            data={testData}
            renderItem={renderPost}
            keyExtractor={(item, index) => `thread-${item.id}`}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
        />
    )
}