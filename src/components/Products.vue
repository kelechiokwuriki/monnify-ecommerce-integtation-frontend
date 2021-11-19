<template>
    <div>
        <h1>Merce's store</h1>
        <hr>
        <div class="row">
            <div class="col-sm-4" v-for="product in products" v-bind:key="product.id">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ product.name }}</h5>
                        <p class="card-text">Selling for ₦{{Intl.NumberFormat().format(product.price)}}</p>
                        <a href="#" class="btn btn-primary" @click="addProductToCart(product)">Add to cart</a>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
import { eventBus } from '../main'

export default {
    name: 'Products',
    data() {
        return {
            products: []
        }
    },
    methods: {
        addProductToCart(product) {            
            eventBus.$emit('add-product-to-cart', product);
        },
        getAllProducts() {
            const baseUrl = process.env.VUE_APP_API_BASE_URL;

            this.axios.get(baseUrl + '/api/product').then(response => {
                this.products = response.data;
            })
        }
    },
    mounted() {
        this.getAllProducts();
    }
}
</script>
