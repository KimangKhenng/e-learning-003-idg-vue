<template>
    <div class="space-y-6">
        <h1 class="text-2xl font-bold text-gray-800">Stocks</h1>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center">
            <div>
                <label class="text-sm font-medium mr-2">Items per page:</label>
                <select v-model.number="limit" @change="onLimitChange" class="border rounded px-2 py-1">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                </select>
            </div>

            <div class="space-x-2">
                <button @click="prevPage" :disabled="!pagination.hasPrevPage"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Prev
                </button>
                <span class="text-sm">Page {{ pagination.page }} of {{ pagination.totalPages }}</span>
                <button @click="nextPage" :disabled="!pagination.hasNextPage"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>

        <!-- Stocks Table -->
        <div v-if="loading" class="text-gray-500">Loading stocks...</div>
        <div v-else-if="error" class="text-red-600">Error loading stocks: {{ error }}</div>

        <div v-else class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded shadow text-sm">
                <thead class="bg-indigo-100">
                    <tr>
                        <th class="text-left p-2 border-b">Name</th>
                        <th class="text-left p-2 border-b">Quantity</th>
                        <th class="text-left p-2 border-b">Price ($)</th>
                        <th class="text-left p-2 border-b">User</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="stock in stocks" :key="stock._id" class="hover:bg-gray-50">
                        <td class="p-2 border-b">{{ stock.name }}</td>
                        <td class="p-2 border-b">{{ stock.quantity }}</td>
                        <td class="p-2 border-b">{{ stock.price.toFixed(2) }}</td>
                        <td class="p-2 border-b text-gray-500">{{ stock.byUser.name }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'StocksView',
    data() {
        return {
            stocks: [],
            loading: false,
            error: null,
            page: 1,
            limit: 10,
            pagination: {
                page: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false
            }
        }
    },
    mounted() {
        this.fetchStocks()
    },
    methods: {
        async fetchStocks() {
            this.loading = true
            this.error = null
            try {
                const { data } = await axios.get('http://localhost:3000/api/stocks', {
                    params: { page: this.page, limit: this.limit, populate: 'byUser' }
                })

                this.stocks = data.docs
                this.pagination = {
                    page: data.page,
                    totalPages: data.totalPages,
                    hasNextPage: data.hasNextPage,
                    hasPrevPage: data.hasPrevPage
                }
            } catch (err) {
                this.error = err.message || 'Failed to fetch stocks.'
            } finally {
                this.loading = false
            }
        },
        nextPage() {
            if (this.pagination.hasNextPage) {
                this.page++
                this.fetchStocks()
            }
        },
        prevPage() {
            if (this.pagination.hasPrevPage) {
                this.page--
                this.fetchStocks()
            }
        },
        onLimitChange() {
            this.page = 1
            this.fetchStocks()
        }
    }
}
</script>
