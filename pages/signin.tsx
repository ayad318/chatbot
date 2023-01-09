import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { getURL } from '../utils/helpers';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { Button, Loading } from '@nextui-org/react';
import { Typography } from '@supabase/ui';

const SigninContainer = (props: { supabaseClient: { auth: { signOut: () => void; }; }; children: any; }) => {
    const { user } = Auth.useUser()
    if (user)
        return (
            <>
                <Typography.Text>Signed in: {user.email}</Typography.Text>
                <Button onClick={() => props.supabaseClient.auth.signOut()}>
                    Sign out
                </Button>
            </>
        )
    return props.children
}
const SignIn = () => {
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        if (user) {
            router.replace('/account');
        }
    }, [user]);

    if (!user)
        return (

            <Auth.UserContextProvider supabaseClient={supabaseClient}>
                <SigninContainer supabaseClient={supabaseClient}>
                    <Auth supabaseClient={supabaseClient} providers={['google', 'facebook', 'apple']} />
                </SigninContainer>
            </Auth.UserContextProvider>

        );

    return (

        <Loading />

    );
};

export default SignIn;