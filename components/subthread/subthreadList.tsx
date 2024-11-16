import { SubthreadItem } from './subthreadItem';
import { FlatList } from 'react-native';
import { ISubThread } from '../../types/model'

const testData: ISubThread[] = [
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806b",
        "user_id": "9sdf278j-9977-4a1c-874a-2c0e1bed503d",
        "username": "Sylph",
        "university_abbreviated_name": "UMN",
        "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "subthread_id": "7a1311cd-a25e-4270-84e7-7d37774502cf",
        "subthread_name": "Perkuliahan",
        "subthread_color": "#00FFFF",
        "subthread_follower": "14506 follower",
        "subthread_description": "seputar dunia perkuliahan yang ada",
        "title": "Kuliah now",
        "content": "kuliah description description",
        "content_summary": "this is a summary",
        "is_active": true,
        "like_count": 0,
        "dislike_count": 0,
        "comment_count": 0,
        "created_by": "meshach.christian@student.umn.ac.id",
        "created_at": "2024-11-12T20:16:52.744793Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806c",
        "user_id": "9sdf278j-9977-4a1c-874a-2c0e1bed503d",
        "username": "Sylph",
        "university_abbreviated_name": "UMN",
        "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
        "subthread_name": "General",
        "subthread_color": "#FFC0CB",
        "subthread_follower": "4235 follower",
        "subthread_description": "yang pasti relate banget sama mahasiswa",
        "title": "Temen gw kesandung kura kura di kampus",
        "content": "this is a description",
        "content_summary": "this is a summary",
        "is_active": true,
        "like_count": 0,
        "dislike_count": 0,
        "comment_count": 0,
        "created_by": "meshach.christian@student.umn.ac.id",
        "created_at": "2024-11-14T19:33:28.384301Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806d",
        "user_id": "9sdf278j-9977-4a1c-874a-2c0e1bed503d",
        "username": "Sylph",
        "university_abbreviated_name": "UMN",
        "university_image_url": "https://pacificgarden.co.id/wp-content/uploads/2021/10/Logo-UBM-Universitas-Bunda-Mulia-Original-1024x744.png",
        "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
        "subthread_name": "LoveLife",
        "subthread_color": "#FFC0CB",
        "subthread_follower": "98720 follower",
        "subthread_description": "kehidupan percintaan kita kita",
        "title": "My first love",
        "content": "this is a description",
        "content_summary": "this is a summary",
        "is_active": true,
        "like_count": 0,
        "dislike_count": 0,
        "comment_count": 0,
        "created_by": "meshach.christian@student.umn.ac.id",
        "created_at": "2024-11-14T19:33:24.5118Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806e",
        "user_id": "9sdf278j-9977-4a1c-874a-2c0e1bed503d",
        "username": "Sylph",
        "university_abbreviated_name": "UMN",
        "university_image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "subthread_id": "c1a2f145-d7cb-4c2a-80e4-937de53697c1",
        "subthread_name": "LoveLife",
        "subthread_color": "#FFC0CB",
        "subthread_follower": "65982 follower",
        "subthread_description": "ini semua tentang aku dan kamu",
        "title": "NT guys T_T",
        "content": "this is a description",
        "content_summary": "this is a summary",
        "is_active": true,
        "like_count": 1,
        "dislike_count": 0,
        "comment_count": 1,
        "created_by": "meshach.christian@student.umn.ac.id",
        "created_at": "2024-11-16T09:41:03.12703Z",
        "updated_by": null,
        "updated_at": null
    }
]

interface ISubThreadProps {
    title: string
}

export const SubthreadList = (props: ISubThreadProps) => {

    const renderPost = ({ item }) => (
        <SubthreadItem thread={item} />
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