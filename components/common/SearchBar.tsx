import { XStack, Button, Input, InputProps } from 'tamagui'
import { Search } from '@tamagui/lucide-icons'

interface ISearchBarProps extends InputProps {
    query?: string
}

export const SearchBar = (props: ISearchBarProps) => {

    return (
        <XStack borderRadius="$2" bg="#595959" alignItems="center" >
            <Input value={props.value}
                onChangeText={props.onChangeText}
                backgroundColor="transparent"
                flex={1} borderWidth={0}
                color='white'
                placeholder={props.placeholder}
                placeholderTextColor="white" />
            <Button disabled chromeless padding="$3" icon={<Search color="white" size="$1.5" />} />
        </XStack>
    )
}