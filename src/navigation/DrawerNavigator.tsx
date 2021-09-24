import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ROUTES from '@utils/routes';
import Dashboard from '@screens/Dashboard';

const Drawer = createDrawerNavigator();

const DrawerNavigator = memo(() => {
  return (
    <Drawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
      sceneContainerStyle={styles.sceneContainerStyle}>
      <Drawer.Screen name={ROUTES.Dashboard} component={Dashboard} />
    </Drawer.Navigator>
  );
});
export default DrawerNavigator;

const styles = StyleSheet.create({
  drawerStyles: {
    flex: 1,
    width: '70%',
    backgroundColor: 'transparent',
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
});
