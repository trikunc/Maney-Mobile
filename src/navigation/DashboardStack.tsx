import React, { memo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ROUTES from '@utils/routes';
import Dashboard from '@screens/Dashboard';
import HeaderButton from '@elements/Header/HeaderButton';
import colors from '@utils/colors';
import FONTS from '@utils/fonts/index';
import { StyleSheet } from 'react-native';
import { ICON } from '@svg/Icon';

const Stack = createStackNavigator();

const DashboardStack = memo(() => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.Dashboard}
        component={Dashboard}
        options={({ navigation }) => ({
          headerTitle: 'Dashboard',
          headerTitleAlign: 'center',
          headerTintColor: colors.grey2,
          headerTitleStyle: styles.headerTitleStyle,
          headerStyle: styles.headerStyle,
          headerLeft: () => (
            <HeaderButton
              icon={ICON.menu}
              onPress={() => {
                // navigation.openDrawer();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
});

export default DashboardStack;

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: FONTS.MUKTA.SemiBold,
    fontSize: 17,
    fontWeight: '600',
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    shadowRadius: 0,
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
