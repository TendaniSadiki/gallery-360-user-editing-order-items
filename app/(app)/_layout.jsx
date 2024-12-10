import { ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { Redirect, Stack, usePathname } from 'expo-router';
import { useSession } from '../../providers/AuthProvider';
import ScreenContainer from '../../components/containers/ScreenContainer';
import TransparentHeaderView from '../../components/TransparentHeaderView';

const AppLayout = () => {
    const { isLoggedIn, isProfileSet, user, isLoading } = useSession()
    const pathname = usePathname()
    const authRoutes = ['/sign-in', '/sign-up']
    // console.log('in layout');
    if (isLoading === true || isLoggedIn === null) {
        return (
            <ScreenContainer>
                <TransparentHeaderView padding={0} style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={100} color={'#ceb89e'}/>
                </TransparentHeaderView>
            </ScreenContainer>
        )
    }
    if (isLoggedIn === true && authRoutes.includes(pathname) === true && isProfileSet === true) {
        return <Redirect href={'/'} />
    } else if (isLoggedIn === true && isProfileSet === false) {
        if (pathname !== '/user/address-setup') {
            return <Redirect href={'/user/address-setup'} />
        }
    } else if (isLoggedIn === false && authRoutes.includes(pathname) === false) {
        return <Redirect href={'/sign-in'} />
    }
    return (
        <Stack screenOptions={{
            headerBackVisible: false,
            headerShown: false
        }} />
    )
}

export default AppLayout

const styles = StyleSheet.create({})