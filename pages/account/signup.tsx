import { Container, Card, Input, Spacer, Button, Row, Text, Link } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Database } from "../../types_db";
import React from "react";

const SignUp = () => {
    const router = useRouter();
    const user = useUser();
    const supabaseClient = useSupabaseClient<Database>();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const validatePassword = () => {
        return password == password1;
    };

    async function signUpWithEmail(email: string, password: string) {
        if (validatePassword()) {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
            })

            error ? (setError(error.message), setMessage('')) : (setError(''), setMessage('Check your inbox to verify your account'))
            console.log(data, error)
        } else {
            setError('Passwords do not match')
            setMessage('')
        }
    }

    const helper = React.useMemo(() => {
        if (!password1)
            return 'primary';
        const isValid = validatePassword();
        return isValid ? "success" : "error";

    }, [password1, validatePassword]);

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
                        Sign Up
                    </Text>

                    <form >
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
                        <Input.Password
                            value={password1}
                            onChange={e => setPassword1(e.target.value)}
                            label='Confirm Password'

                            color={helper}
                            helperColor={helper}
                            clearable
                            bordered
                            fullWidth
                            required
                            minLength={6}

                            type='password'
                            // color="primary"
                            size="lg"
                            placeholder="Confirm Password"
                        />
                        <Spacer y={1} />
                        <Button onPress={() => signUpWithEmail(email, password)} css={{ w: 'stretch' }}>Sign Up</Button>
                    </form>
                    {error && <Text as={'center'} color='error'>{error}</Text>}
                    {message && <Text as={'center'} >{message}</Text>}
                    <Row justify="center">
                        <Link href='/account/signin'>Already have an account? Sign in</Link>
                    </Row>
                    <Spacer y={1} />
                </Card>
            </Container >

        );



};

export default SignUp;