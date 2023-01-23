import { useRouter } from "next/router";
import { Price, ProductWithPrice } from "../types";
import { useUser } from "../utils/useUser";
import { useState } from "react";
import { getStripe } from "../utils/stripe-client";
import { getURL, postData } from "../utils/helpers";
import { Button, Card, Container, Row, Spacer, Text } from "@nextui-org/react";

type BillingInterval = 'week' | 'year' | 'month';
interface Props {
    products: ProductWithPrice[];
}
function Pricing({ products }: Props) {
    const router = useRouter();
    const [billingInterval, setBillingInterval] =
        useState<BillingInterval>('week');
    const [priceIdLoading, setPriceIdLoading] = useState<string>();
    const { user, isLoading, subscription } = useUser();
    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id);
        if (!user) {
            return router.push('/account/signin');
        }
        if (subscription) {
            return router.push('/account');
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            });

            const stripe = await getStripe();
            stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            console.log(error)
            return alert((error as Error)?.message);
        } finally {
            setPriceIdLoading(undefined);
        }
    };
    if (!products.length) {
        return (<Text h2 as={'center'}>No subscription pricing plans found. Create them in your Stripe Dashboard</Text>)
    }
    return (
        <Container as="center">
            <Button.Group color="gradient" ghost>
                <Button ghost onPress={() => setBillingInterval('week')}>Weekly</Button>
                <Button onPress={() => setBillingInterval('month')}>Monthly</Button>
                <Button onPress={() => setBillingInterval('year')}>Yearly</Button>
            </Button.Group>
            <Spacer y={2} />
            {/* <Row> */}
            {
                products.map((product) => {
                    const price = product?.prices?.find(
                        (price) => price.interval === billingInterval
                    );
                    if (!price) return null;
                    const priceString = new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: price.currency,
                        minimumFractionDigits: 0
                    }).format((price?.unit_amount || 0) / 100);
                    return (
                        <Card
                            as="center"
                            variant="shadow"
                            css={{ w: 'fit-content' }}
                            key={product.id}
                        >
                            <Card.Header>
                                <Text h2>

                                    {product.name}
                                </Text>
                            </Card.Header>
                            <Card.Body>

                                <Text>{product.description}</Text>
                                <Text>

                                    {priceString}
                                </Text>
                                <Text>
                                    /{billingInterval}

                                </Text>
                            </Card.Body>
                            <Card.Footer>

                                <Button
                                    disabled={isLoading}
                                    onPress={() => handleCheckout(price)}
                                >
                                    {product.name === subscription?.prices?.products?.name
                                        ? 'Manage'
                                        : 'Subscribe'}
                                </Button>
                            </Card.Footer>
                        </Card >
                    );
                })
            }
            {/* </Row> */}
        </Container >
    )

}

export default Pricing;