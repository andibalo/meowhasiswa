import { useTheme } from 'tamagui';
import { TabBar, TabBarProps } from 'react-native-tab-view';
import { Text } from 'tamagui';

type Route = {
    key: string;
    title: string;
};

export const TopTabBar = (props: TabBarProps<Route>) => {
    const theme = useTheme();

    return (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: '#030303',
                height: 3,
            }}
            activeColor="#030303"
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