<template>
    <div>
        <h1>Basket</h1>
        <hr>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Item</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cartItems" v-bind:key="item.id">
                    <th scope="row">{{index + 1}}</th>
                    <td>{{item.name}}</td>
                    <td>₦{{Intl.NumberFormat().format(item.price)}}</td>
                    <td>x{{item.quantity}}</td>
                </tr>
            </tbody>
        </table>
        <div class="row">
            <div class="col-sm-6">
                <button class="btn btn-primary" @click="payForCartItems" :disabled="items.length <= 0">Pay now</button>
            </div>
             <div class="col-sm-6">
                Total: ₦{{Intl.NumberFormat().format(getCartTotal())}}
            </div>
        </div>
    </div>
</template>


<script>
import { eventBus } from '../main'

export default {
    name: 'Cart',
    data() {
        return {
            items: []
        }
    },
    methods: {
        addProductToCart(product) {
            if (this.items.length > 0) {
                const productIndex = this.items.findIndex(productInCart => productInCart.id === product.id);

                if (productIndex > -1) {
                    let productFound = this.items[productIndex];

                    productFound.quantity++;
                    productFound.totalPrice = productFound.quantity * productFound.price;
                    return window.Vue.set(this.items, productIndex, product);
                }
            }
            product.quantity = 1;
            product.totalPrice = product.quantity * product.price;
            this.items.push(product);
        },
        payForCartItems() {
            const cartData = {
                totalAmount: this.getCartTotal(),
                paymentDescription: "payment for item's merce's store",
                customerName: "Fake name",
                customerEmail: "Fakeemail@fakeemail.com"
            };

            const baseUrl = process.env.VUE_APP_API_BASE_URL;

            this.axios.post(baseUrl + '/api/product/process-payment', cartData).then(response => {
                if (response.status === 200) {
                    return window.open(response.data, '_blank').focus();
                }
                return alert("Failed to receive checkout url");
            })
        },
        getCartTotal() {
            return this.items.reduce((a, b) => +a + +b.totalPrice, 0);
        }
    },
    created() {
        eventBus.$on('add-product-to-cart', this.addProductToCart);
    },
    computed: {
        cartItems() {
            return this.items;
        }
    }
}
</script>

