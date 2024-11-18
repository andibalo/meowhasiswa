import { useTheme } from 'tamagui';
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
            indicatorStyle={{
                backgroundColor: theme.primary.val,
                height: 3,
            }}
            activeColor={theme.primary.val}
            inactiveColor="#C5C5C5"
            style={{
                backgroundColor: 'white',
                borderRadius: 2,
                marginBottom: 10,
                elevation: 0,
                shadowOpacity: 0,
            }}
        />
    );
};