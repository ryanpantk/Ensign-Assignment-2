/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Product from './Pages/Product';
import { GetProduct } from './Services/FakeStore';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Cart from './Pages/Cart';
import { act } from 'react-dom/test-utils';
import App from './App';
import Home from './Pages/Home';
import { ProductListing } from './Model/ProductListing';

/*
    Default component to render with test-defined routes
*/
const renderComponent = (route: string) => {
    render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                {/* <Route path="/product/:id" element={<Product />} /> */}
                <Route
                    path="/" 
                    element={<App />} 
                    children={[
                        <Route key='0' path="/" element={<Home />} />,
                        <Route key='1' path="/cart" element={<Cart />} />,
                        <Route key='2' path="/product/:id" element={<Product />} />,
                    ]}
                />
            </Routes>
        </MemoryRouter>
    );
}

/* 
    Test the Product page
*/
test('renders product page', async () => {
    // Get the product with id 1
    let product: ProductListing | undefined;
    await act(async() => {
        product = await GetProduct('1');
    });

    // Render the product page with the product of id 1
    renderComponent('/product/1');

    // Check if the product is rendered
    expect(await screen.findByText(product!.getTitle())).toBeInTheDocument();
    expect(await screen.findByText(product!.getCategory())).toBeInTheDocument();
    expect(await screen.findByText(product!.getDescription())).toBeInTheDocument();
    expect(await screen.findByText(`$${product!.getPrice()}`)).toBeInTheDocument();
});

/*
    Test the add to cart button
*/
test('add to cart', async () => {
    // Get the product with id 1
    let product: ProductListing | undefined;
    await act(async() => {
        product = await GetProduct('1');
    });

    // Render the product page with the product of id 1
    renderComponent('/product/1');
    
    // Click the add to cart button
    await waitFor(async () => {
        userEvent.click(screen.getByText('Add to Cart'));
    });

    // Click the cart button
    await waitFor(async () => {
        userEvent.click(await screen.findByText('My Shopping Cart'));
    });

    // Check if the product is added to the cart
    expect(await screen.findByText(product!.getTitle())).toBeInTheDocument();
});

/*
    Test the increment button
*/
test('increment quantity', async () => {
    // Render the product page with the product of id 1
    renderComponent('/cart');

    // Check the initial quantity
    const initialQuantity = parseInt(screen.getByTitle('quantity').textContent!);

    // Increment the quantity
    await waitFor(async () => {
        userEvent.click(screen.getByText('+'));
    });

    // Check if the quantity is incremented
    expect(screen.getByTitle('quantity')).toHaveTextContent((initialQuantity + 1).toString());
});

/*
    Test the decrement button
*/
test('decrement quantity', async () => {
    // Render the product page with the product of id 1
    renderComponent('/cart');

    // Check the initial quantity
    const initialQuantity = parseInt(screen.getByTitle('quantity').textContent!);

    // Increment the quantity
    await waitFor(async () => {
        userEvent.click(screen.getByText('-'));
    });

    // Check if the quantity is decremented
    expect(screen.getByTitle('quantity')).toHaveTextContent((initialQuantity - 1).toString());
});

/*
    Test the remove button
*/
test('remove from cart', async () => {
    // Get the product with id 1
    let product: ProductListing | undefined;
    await act(async() => {
        product = await GetProduct('1');
    });

    // Render the product page with the product of id 1
    renderComponent('/cart');

    // Check if the product is added to the cart
    expect(await screen.findByText(product!.getTitle())).toBeInTheDocument();

    // Remove the product
    await waitFor(async () => {
        userEvent.click(screen.getByText('Remove'));
    });

    // Check if the product is removed
    expect(screen.queryByText(product!.getTitle())).not.toBeInTheDocument();
});

/*
    Test price calculation
*/
test('price calculation', async () => {
    // Get the product with id 1
    let product: ProductListing | undefined;
    await act(async() => {
        product = await GetProduct('1');
    });

    // Render the product page with the product of id 1
    renderComponent('/product/1');
    
    // Click the add to cart button
    await waitFor(async () => {
        userEvent.click(screen.getByText('Add to Cart'));
    });

    // Click the cart button
    await waitFor(async () => {
        userEvent.click(await screen.findByText('My Shopping Cart'));
    });

    await waitFor(async () => {
        screen.getByTitle('total');
    });

    // Check price calculation
    expect(screen.getByTitle('total')).toHaveTextContent(`$${product!.getPrice()}`);

    // Increment the quantity
    await waitFor(async () => {
        userEvent.click(screen.getByText('+'));
    });

    // Check price calculation
    expect(screen.getByTitle('total')).toHaveTextContent(`$${(product!.getPrice() * 2).toFixed(2)}`);
});

/* 
    Test Checkout button
*/
test('checkout', async () => {
    // Get the product with id 1
    let product: ProductListing | undefined;
    await act(async() => {
        product = await GetProduct('1');
    });

    // Render the product page with the product of id 1
    renderComponent('/cart');

    // Click the checkout button
    await waitFor(async () => {
        userEvent.click(screen.getByText('Checkout'));
    });

    // Click the cart button
    await waitFor(async () => {
        userEvent.click(await screen.findByText('My Shopping Cart'));
    });

    // Check if the product is removed
    expect(await screen.findByText("Your cart is empty.")).toBeInTheDocument();
});