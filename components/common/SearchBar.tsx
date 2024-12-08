import { XStack, Button, Input, InputProps, useTheme } from 'tamagui'
import { Search } from '@tamagui/lucide-icons'

interface ISearchBarProps extends InputProps {
    query?: string
}

export const SearchBar = (props: ISearchBarProps) => {
    const theme = useTheme()

    return (
        <XStack borderRadius="$2" bg={theme.accentTint.val} alignItems="center"  >
            <Input
                value={props.value}
                onChangeText={props.onChangeText}
                onSubmitEditing={props.onSubmitEditing}
                backgroundColor="transparent"
                flex={1}
                borderWidth={0}
                color='$primary'
                placeholder={props.placeholder}
                placeholderTextColor="$secondary"
                autoCapitalize="none"
            />
            <Button disabled chromeless padding="$3" icon={<Search color="$primary" size="$1.5" />} />
        </XStack>
    )
}