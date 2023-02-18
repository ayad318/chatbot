import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Container, Card, Input, Spacer, Row, Checkbox, Button, Text } from '@nextui-org/react';
import Link from 'next/link';
import { Database } from '../../types_db';
import { useUser } from '../../utils/useUser';

const SignIn = () => {
    const router = useRouter();
    const { user, subscription } = useUser();
    const supabaseClient = useSupabaseClient<Database>();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    async function signInWithEmail(email: string, password: string) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        })

        error ? setError(error.message) : ''
    }
    useEffect(() => {
        if (user) {
            if (subscription)
                router.replace('/dashboard');
            else
                router.replace('/pricing');
        }
    }, [router, subscription, user]);

    if (!user)
        return (


            <Container
                display="flex"
                alignItems="center"
                justify="center"
                css={{ minHeight: '100vh' }}
            >
                <Card css={{ mw: '420px', p: '20px' }}>
                    <Text
                        size={24}

                        weight="bold"
                        css={{
                            as: 'center',
                            mb: '20px',
                        }}
                    >
                        Login
                    </Text>

                    <form>
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            label='Email'
                            clearable
                            bordered
                            fullWidth
                            required

                            color="primary"
                            size="lg"
                            placeholder="Email"
                        />
                        <Spacer y={1} />
                        <Input.Password
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            label='Password'
                            clearable
                            bordered
                            fullWidth
                            required
                            minLength={6}
                            type='password'
                            color="primary"
                            size="lg"
                            placeholder="Password"
                        />
                        <Spacer y={1} />
                        <Button onPress={() => signInWithEmail(email, password)} css={{ w: 'stretch' }}>Sign in</Button>
                    </form>
                    {error && <Text as={'center'} color='error'>{error}</Text>}
                    <Spacer y={1} />
                    <Row justify="center">
                        <Link href='/account/forgetpassword'>Forgot password?</Link>
                    </Row>
                    <Spacer y={1} />
                    <Row
                        justify="center" >
                        <Link href='/account/signup'>Dont have an account? Sign up Now</Link>
                    </Row>
                </Card>
            </Container >

        );



};

export default SignIn;