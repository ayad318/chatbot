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

    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const validatePassword = () => {
        return password == password1;
    };

    async function ResetPassword(password: string) {
        if (validatePassword()) {
            const { data, error } = await supabaseClient.auth.updateUser({
                password: password
            })

            error ? (setError(error.message), setMessage('')) : (setError(''), setMessage('Password reset succesfully'), supabaseClient.auth.signOut())
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
        if (!user) {
            router.replace('/account/signin');
        }
    }, [router, user]);

    if (user)
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
                        Reset Password
                    </Text>

                    <form >
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
                        <Button onPress={() => ResetPassword(password)} css={{ w: 'stretch' }}>Submit</Button>
                    </form>
                    {error && <Text as={'center'} color='error'>{error}</Text>}
                    {message && <Text as={'center'} >{message}</Text>}
                    <Spacer y={1} />
                </Card>
            </Container >

        );



};

export default SignUp;