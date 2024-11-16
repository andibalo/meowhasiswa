import { useTheme } from 'tamagui'
import { TabBar, TabBarProps } from 'react-native-tab-view';

type Route = {
    key: string;
    title: string;
};

export const TopTabBar = (props: TabBarProps<Route>) => {

    const theme = useTheme()

    return (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: theme.primary.val }}
            activeColor={theme.primary.val}
            inactiveColor={theme.secondary.val}
            style={{
                borderRadius: 2,
                backgroundColor: 'white',
                marginBottom: 10
            }}
        />
    )
}