<template>
    <router-link :to="'/stocks/' + stock._id">
        <tr class="hover:bg-gray-50 hover:cursor-pointer">
            <td class="p-2 border-b">{{ stock.name }}</td>
            <td class="p-2 border-b">{{ stock.quantity }}</td>
            <td class="p-2 border-b">{{ stock.price.toFixed(2) }}</td>
            <td class="p-2 border-b text-gray-500">{{ stock.byUser.name }}</td>
        </tr>
    </router-link>
</template>
<script>
export default {
    props: {
        stock: {
            type: Object,
            default: () => {
                return {
                    name: "",
                    quantity: 0,
                    price: 0,
                    byUser: {}
                }
            }
        }
    }
}
</script>