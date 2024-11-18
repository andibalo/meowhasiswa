import { SubThreadItem } from './SubThreadItem';
import { FlatList } from 'react-native';
import { ISubThread } from '../../types/model'

const testData: ISubThread[] = [
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806b",
        "name": "Perkuliahan",
        "followers_count": "14506 follower",
        "description": "Seputar dunia perkuliahan yang ada",
        "image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "label_color": "#00FFFF",
        "university_id": "null",
        "is_university_subthread": "false",
        "created_by": "meshach.christian@student.umn.ac.id",
        "created_at": "2024-11-12T20:16:52.744793Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806b",
        "name": "General",
        "followers_count": "4235 follower",
        "description": "Apa aja deh",
        "image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "label_color": "#FFC0CB",
        "university_id": "null",
        "is_university_subthread": "false",
        "created_by": "meshach.christian@student.umn.ac.id",
        "created_at": "2024-11-12T20:16:52.744793Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806b",
        "name": "Lovelife",
        "followers_count": "97823 follower",
        "description": "My first love",
        "image_url": "https://pacificgarden.co.id/wp-content/uploads/2021/10/Logo-UBM-Universitas-Bunda-Mulia-Original-1024x744.png",
        "label_color": "#00FFFF",
        "university_id": "null",
        "is_university_subthread": "false",
        "created_by": "meshach.christian@student.umn.ac.id",
        "created_at": "2024-11-12T20:16:52.744793Z",
        "updated_by": null,
        "updated_at": null
    },
    {
        "id": "e0b2e510-0492-479c-abb4-f1c9a044806b",
        "name": "Lovelife",
        "followers_count": "42368 follower",
        "description": "Rahasia aku dan dia",
        "image_url": "https://registrasi.untar.ac.id/assets/images/logo_untar.png",
        "label_color": "#00FFFF",
        "university_id": "null",
        "is_university_subthread": "false",
        "created_by": "meshach.christian@student.umn.ac.id",
        "created_at": "2024-11-12T20:16:52.744793Z",
        "updated_by": null,
        "updated_at": null
    }
]

interface ISubThreadListProps {
    title: string
}

export const SubThreadList = (props: ISubThreadListProps) => {

    const renderPost = ({ item }) => (
        <SubThreadItem Subthread={item} />
    );

    return (
        <FlatList
            data={testData}
            renderItem={renderPost}
            keyExtractor={(item, index) => `subthread-${item.id}`}
            onEndReachedThreshold={0.5}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
        />
    )
}