import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

import { Container, Card, Input, Spacer, Row, Checkbox, Button, Text } from '@nextui-org/react';
import Link from 'next/link';
import { Database } from '../../types_db';
import { getURL } from '../../utils/helpers';

const ForgetPassword = () => {
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient<Database>();
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    async function SendresetPasswordForEmail(email: string) {
        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: getURL() + "/account/reset-password" })

        error ? (setError(error.message), setMessage('')) : (setError(''), setMessage('Check your inbox'))
    }
    useEffect(() => {
        if (user) {
            router.replace('/dashboard');
        }
    }, [router, user]);

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
                        Forget Password
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
                        <Button onPress={() => SendresetPasswordForEmail(email)} css={{ w: 'stretch' }}>Submit</Button>
                    </form>
                    {error && <Text as={'center'} color='error'>{error}</Text>}
                    {message && <Text as={'center'} >{message}</Text>}
                    <Spacer y={1} />
                    <Row justify="center">
                        <Link href='/account/signin'>Already have an account? Signin</Link>
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

export default ForgetPassword;