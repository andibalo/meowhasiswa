import { useTheme } from 'tamagui';
import { TabBar, TabBarProps } from 'react-native-tab-view';
import { Text } from 'tamagui';

type Route = {
    key: string;
    title: string;
};

export const TopTabBar = (props: TabBarProps<Route>) => {
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
            renderLabel={({ route, focused }) => (
                <Text
                    style={{
                        fontSize: 14,
                        fontWeight: focused ? 'bold' : 'normal',
                        color: focused ? '#030303' : '#C5C5C5',
                    }}
                >
                    {route.title}
                </Text>
            )}
        />
    );
};